import { StyleSheet, Text, View, Image, Dimensions, Pressable, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import ListProduk from '../Components/ListProduk';
import Garis from '../Components/Garis';
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { KategoriPre } from '../assets/Images/Index';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProdukKosong from '../Components/ProdukKosong'
import Kategori from '../Components/Kategori';


const { height, width } = Dimensions.get('window')

const kosongproduk = () => {
  return(
  <View style={{alignItems:'center', paddingBottom:40}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.7,
    }}>
      Maaf, mitra tidak memilik produk kategori ini
    </Text>
  </View>
  )
}

const EtalaseScreen = ({ route }) => {

  const navigation = useNavigation();

  const[produkutama,setProdukUtama] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const { pilkategori } = useSelector(state => state.kategori);

  const pindahMangkal = () => {
    navigation.navigate('PosisiScreen', { 
      namamitra, namatoko, foto_akun, 
      mangkal, tempat_mangkal,
    })
  }
  
  const pindahPreorder = () => {
    navigation.navigate('PreorderScreen', { 
      id_mitra,
    })
  }

  const pindahPanggil = () => {
    navigation.navigate('LokasiScreen', { 
      namatoko, foto_akun,
    })
  }

  useEffect(()=>{
    const fetchProdukUtama = async() => {
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
            setProdukUtama(list); // (1) write data to state
            setLoading(false); // (2) write some value to state
          }
          return () => { // This code runs when component is unmounted
              componentMounted.current = false; // (4) set it to false when we leave the page
          }
  
        } catch(err){
          console.log(err);
        }
      }
      fetchProdukUtama();
    },[pilkategori])

  const { 
    namamitra, namatoko, foto_akun, tempat_mangkal, mangkal, id_mitra, waktu_buka, waktu_tutup
     } = route.params;

  const atasetalase = () => {
    return(
    <View>
      <View style={styles.atas}>
          <View style={{
              flexDirection:'row', alignItems:'center', 
              justifyContent:'space-between', marginBottom: 10,
              }}>
              <View>
                <Text style={{color: IjoTua, fontSize:20, fontWeight: 'bold'}}>{namatoko}</Text>
                <Text style={{color: IjoTua, fontSize:14, fontWeight: 'bold'}}>200m | 20 menit </Text>
                <Text style={{color: Ijo, fontSize:14, fontWeight: 'bold'}}>Waktu Operasional: {waktu_buka} - {waktu_tutup}</Text>
              </View>
              <View>
                <Image source={{uri: foto_akun}} style={styles.gambartoko}/>
              </View>
          </View>
          <Pressable style={styles.lokasi} onPress={pindahMangkal}>
              <Text style={{color: Ijo, textAlign:'center', fontWeight: 'bold'}}>Lokasi Mangkal</Text>
          </Pressable>
      </View>
      <View style={{marginVertical:10}}>
          <View style={{paddingHorizontal: 10}}>
              <Text style={styles.judul}>Daftar Produk Utama</Text> 
              <Text>Produk ini tersedia di gerobak mitra</Text> 
          </View>
          <Kategori/>
      </View>
    </View>
    )
  }

  const bawahetalase = () => {
    return(
      <View>
        <View style={{marginBottom:10, marginLeft: 10}}>
            <Garis/>
            <Text style={styles.judul}>Tidak menemukan produk?</Text>
            <Text>Aku juga punya produk pre-order loh</Text> 
        </View>
        <Pressable style={styles.preorder} onPress={pindahPreorder}>
          <View style={{width: 200}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: IjoTua}}>Pre-Order</Text>
              <Text>Lihat produk pre-order yang bisa dipesan</Text>
          </View>
          <Image source={KategoriPre} style={styles.gambarpre} />
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.latar}>
        { loading ?
          (
          <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center',flex: 1}}>
            <ActivityIndicator size="large" color={IjoTua}/>
          </View>
          ):(
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:80}} 
              numColumns={3}
              columnWrapperStyle={{justifyContent:'space-evenly'}}
              data={produkutama}
              renderItem= {({item}) => <ListProduk item={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={atasetalase}
              ListFooterComponent={bawahetalase}
              ListEmptyComponent={kosongproduk}
            />
          )
        }
      { mangkal ? 
              (
                <View style={{flexDirection: 'column-reverse'}}>
                  <View style={styles.mangkal}>
                    <View>
                        <Text style={{ color: Putih, textAlign:'center', fontStyle:'italic', }}>
                          Maaf, mitra sedang mangkal sehingga tidak bisa dipanggil
                        </Text>
                    </View>
                  </View>
                </View>
              ) : (
                  <View style={styles.panggil}>
                    <View>
                        <Text style={{fontWeight:'bold', color: Ijo, width: 180}}>Minat sama produknya? Yuk panggil mitra!</Text>
                    </View>
                    <Pressable style={{padding: 10, backgroundColor: Ijo, borderRadius: 10}} 
                    onPress={pindahPanggil}>
                        <Text style={{fontWeight:'bold', color:Putih}}>Panggil Mitra</Text>
                    </Pressable>
                  </View>
              )
            }
    </View>
  )
}

export default EtalaseScreen

const styles = StyleSheet.create({
    latar:{
      flex: 1,
      backgroundColor: Kuning, 
    },
    gambartoko:{
      width: height * 0.1,
      height: height * 0.1,
      borderRadius: 10,
      borderColor: Ijo,
      borderWidth: 2,
    },
    gambarpre:{
      left: 15,
      height: 80,
      width: 80,
    },
    lokasi:{
      width: '100%',
      padding: 5,
      borderRadius: 10,
      backgroundColor: Putih,
    },
    atas:{
      backgroundColor: IjoMint,
      padding: 10,
    },
    judul:{
      fontSize: 16,
      color: IjoTua,
      fontWeight: 'bold',
    },
    preorder:{
      padding: 10,
      backgroundColor: Putih,
      flexDirection: 'row',
      width: '95%',
      marginBottom: 10,
      borderRadius: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf:'center',
      elevation: 5,
    },
    panggil:{
      flexDirection: 'row',
      backgroundColor: IjoMint,
      alignItems:'center',
      justifyContent:'space-between',
      alignSelf:'center',
      bottom: 0,
      padding: 10,
      position: 'absolute',
      width: '100%',
      padding: 20,
      elevation: 5,
    },
    mangkal:{
      flexDirection: 'row',
      backgroundColor: IjoTua,
      alignItems:'center',
      justifyContent:'space-between',
      padding: 10,
      borderRadius: 10,
      position: 'absolute',
      width: '95%',
      margin: 10
    },
})