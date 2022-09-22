import {StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna';
import ListProduk from '../Components/ListProduk';
import { Bawah, Gerobak } from '../assets/Images/Index.js';
import PanggilMitra from '../Components/PanggilMitra';
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useNavigation } from '@react-navigation/native';
import Kategori from '../Components/Kategori';
import ProdukKosong from '../Components/ProdukKosong';
import GarisBatas from '../Components/GarisBatas';
import { useDispatch, useSelector } from 'react-redux';
import MitraTutup from '../Components/MitraTutup';

const { height, width } = Dimensions.get('window')

const atasutama = () => {
  return(
    <View style={{paddingTop: 5}}>
        <View style={styles.bungkus}>
          <Image source={Gerobak} style={styles.gambar}/>
          <View style={{width:'70%'}}>
              <Text style={{fontSize:14, fontWeight:'bold',color: Ijo}}>Cara belanjanya bagaimana?</Text>
              <Text style={{textAlign:'justify', fontSize: 12 }}>
                Produk utama bisa didapatkan dengan metode panggil mitra atau temu langsung.
              </Text>
          </View>
        </View>
        <GarisBatas/>
        <Kategori/>
        <GarisBatas/>
        <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: Ijo}}>Daftar Produk Utama</Text>
            <Text>Kualitas dan kesegaran produk terjamin</Text>
        </View>
    </View>
  )
}

const kosongutama = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Maaf, mitra tidak punya produk utama kategori ini
    </Text>
  </View>
  )
}

const ProdukScreen = ({ route }) => {

  const[produkutama,setProdukutama] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const navigation = useNavigation();

  const { pilkategori } = useSelector(state => state.kategori);


  const { 
    id_mitra, status_sekarang
     } = route.params;

  useEffect(()=>{
    const fetchProdukutama = async() => {
      try{
        const list = []; 
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", id_mitra);
        const colRef = collection(docRef, "produk")

        if ( pilkategori == "Semua Produk" ) {
          const q = query(colRef, where("jenis", "==", "Produk utama"), orderBy("namaproduk"));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const {image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
            list.push({
              id: doc.id,
              namaproduk,
              deskproduk,
              image,
              harga,
              kuantitas,
              satuan,
              kategori,
            });
          });
          } else {
            const qq = query(colRef, where("jenis", "==", "Produk utama"), where("kategori", "==", pilkategori), orderBy("namaproduk"));
            const querySnapshot = await getDocs(qq);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              const {image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
              list.push({
                id: doc.id,
                namaproduk,
                deskproduk,
                image,
                harga,
                kuantitas,
                satuan,
                kategori,
              });
            });
          }
  
          if (componentMounted.current){ // (5) is component still mounted?
            setProdukutama(list); // (1) write data to state
            setLoading(false); // (2) write some value to state
          }
          return () => { // This code runs when component is unmounted
              componentMounted.current = false; // (4) set it to false when we leave the page
          }
  
        } catch(err){
          console.log(err);
        }
      }
    fetchProdukutama();
  },[pilkategori])

  return (
    <View style={styles.latar}>
    { loading ?
      (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
           <ActivityIndicator size="large" color={IjoTua}/>
      </View>
      ):(
      <View>
        <FlatList
                numColumns={3}
                data={produkutama}
                renderItem= {({item}) => <ListProduk item={item} />}
                keyExtractor={ produkutama => produkutama.id}
                columnWrapperStyle={{justifyContent:'space-evenly'}}
                ListHeaderComponent={atasutama}
                ListEmptyComponent={kosongutama}
                ListFooterComponent={
                <View>
                  <Image source={Bawah} style={styles.bawah}/>
                </View>
                }
            /> 
           { status_sekarang == "Tidak Aktif" ? 
           (
              <MitraTutup/>
              ):( 
              <PanggilMitra/>
            )
            }               
      </View>
      )
    }
    </View>
  )
}

export default ProdukScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  bungkus:{
    backgroundColor: IjoMint,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems:'center',
  },
  gambar:{
    width: width * 0.25,
    height: width * 0.25,
    marginLeft: 5,
  },
  input:{
    backgroundColor: Putih,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    flexWrap: 'wrap',
  },
  judulisi:{
    fontSize: 16,
    color: IjoTua,
  },
  bawah:{
    marginTop: height * 0.2,
    width: '100%',
    height: 98,
  }
})