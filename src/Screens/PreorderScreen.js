import {StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna';
import ListPreOrder from '../Components/ListPreOrder';
import ListProduk from '../Components/ListProduk';
import { Bawah, KategoriPre } from '../assets/Images/Index.js';
import Keranjang from '../Components/Keranjang';
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useNavigation } from '@react-navigation/native';
import GarisBatas from '../Components/GarisBatas';
import Kategori from '../Components/Kategori';
import ProdukKosong from '../Components/ProdukKosong'
import { useSelector } from 'react-redux';
import MitraTutup from '../Components/MitraTutup';

const { height, width } = Dimensions.get('window')

const ataspreorder = () => {
  return(
    <View>
        <View style={styles.bungkus}>
          <Image source={KategoriPre} style={styles.gambar}/>
          <View style={{width:'70%'}}>
              <Text style={{textAlign:'justify', fontSize:14, fontWeight:'bold',color: Ijo}}>Bagaimana mekanisme pre-order?</Text>
              <Text style={{textAlign:'justify', fontSize: 12 }}>
                Produk pre-order akan diantar paling lambat 2 x 24 jam setelah pemesanan dan dibayar dengan metode COD.
              </Text>
          </View>
        </View>
        <GarisBatas/>
        <Kategori/>
        <GarisBatas/>
        <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: Ijo}}>Daftar Produk Pre-Order</Text>
            <Text>Kualitas dan kesegaran produk terjamin</Text>
        </View>
    </View>
  )
}

const kosongpre = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Maaf, mitra tidak punya produk pre-order kategori ini
    </Text>
  </View>
  )
}


const PreorderScreen = ({ route }) => {

  const[produkpreorder,setProdukpreorder] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const navigation = useNavigation();

  const { pilkategori } = useSelector(state => state.kategori);

  const { 
    id_mitra, status_sekarang, namalengkap_mitra, namatoko, phone,
     } = route.params;

  useEffect(()=>{
    const fetchProdukPreOrder = async() => {
      try{
        const list = []; 
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", id_mitra);
        const colRef = collection(docRef, "produk")

        if ( pilkategori == "Semua Produk" ) {
          const q = query(colRef, where("jenis", "==", "Produk pre-order"), orderBy("namaproduk"));
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
            const qq = query(colRef, where("jenis", "==", "Produk pre-order"), where("kategori", "==", pilkategori), orderBy("namaproduk"));
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
            setProdukpreorder(list); // (1) write data to state
            setLoading(false); // (2) write some value to state
          }
          return () => { // This code runs when component is unmounted
              componentMounted.current = false; // (4) set it to false when we leave the page
          }
  
        } catch(err){
          console.log(err);
        }
      }
    fetchProdukPreOrder();
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
                data={produkpreorder}
                renderItem= {
                  status_sekarang == "Tidak Aktif" ? (
                    ({item}) => <ListProduk item={item} />
                    ): (
                    ({item}) => <ListPreOrder item={item} />
                  )
                }
                keyExtractor={ produkpreorder => produkpreorder.id}
                columnWrapperStyle={{justifyContent:'space-evenly'}}
                ListHeaderComponent={ataspreorder}
                ListEmptyComponent={kosongpre}
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
              <Keranjang id_mitra = {id_mitra} namalengkap_mitra={namalengkap_mitra} namatoko={namatoko} phone={phone}/>
            )
          }  
      </View>
      )
    }
    </View>
  )
}

export default PreorderScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  bungkus:{
    backgroundColor: IjoMint,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
  },
  gambar:{
    width: width * 0.25,
    height: width * 0.25,
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
  pesan:{
    flexDirection: 'row',
    backgroundColor: Ijo,
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    width: '95%',
    borderColor: IjoTua,
    borderWidth: 3,
    margin: 10
  },
  bawah:{
    marginTop: height * 0.1,
    width: '100%',
    height: 98,
  }
})