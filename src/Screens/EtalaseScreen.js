import { StyleSheet, Text, View, Image, Dimensions, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Hitam, Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import ListProduk from '../Components/ListProduk';
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { KategoriPre } from '../assets/Images/Index';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const EtalaseScreen = ({ route }) => {

  const navigation = useNavigation();

  const[produkutama,setProdukUtama] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const pindahPreorder = () => {
    navigation.navigate('PreorderScreen', { 
      id_mitra: id_mitra,
    })
  }

  useEffect(()=>{
    const fetchProdukUtama = async() => {
      try{
        const list = []; 
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", id_mitra);
        const colRef = collection(docRef, "produk")

        const q = query(colRef, where("jenis", "==", "Produk utama"), orderBy("waktudibuat","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
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
  },[])

  const { 
    namamitra, namatoko, foto_akun, tempat_mangkal, mangkal, id_mitra
     } = route.params;

  return (
    <View style={styles.latar}>
      <View style={styles.atas}>
          <View style={{
              flexDirection:'row', alignItems:'center', 
              justifyContent:'space-between', marginBottom: 10,
              }}>
              <View>
                <Text style={{color: IjoTua, fontSize:20, fontWeight: 'bold'}}>{namatoko}</Text>
                <Text style={{color: IjoTua, fontSize:14, fontWeight: 'bold'}}>200m | 20 menit </Text>
                <Text style={{color: Ijo, fontSize:14, fontWeight: 'bold'}}>Waktu Keliling: 10.00 - 15.00</Text>
              </View>
              <View>
                <Image source={{uri: foto_akun}} style={styles.gambartoko}/>
              </View>
          </View>
          <Pressable style={styles.lokasi}>
              <Text style={{color: Ijo, textAlign:'center', fontWeight: 'bold'}}>Lokasi Mangkal</Text>
          </Pressable>
      </View>
      <View>
        { loading ?
          (
          <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
            <ActivityIndicator size="large" color={IjoTua}/>
          </View>
          ):(
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom:80}} 
              numColumns={3}
              columnWrapperStyle={{justifyContent:'space-evenly'}}
              data={produkutama}
              renderItem= {({item}) => <ListProduk item={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={ 
              <View style={{marginVertical:10, marginLeft: 10}}>
                <Text style={styles.judul}>Daftar Produk</Text> 
              </View>
              }
              ListFooterComponent={
                <View>
                  <View style={{marginBottom:10, marginLeft: 10}}>
                      <Text style={styles.judul}>Tidak menemukan produk?</Text>
                  </View>
                  <Pressable style={styles.preorder} onPress={pindahPreorder}>
                    <View style={{width: 200}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: IjoTua}}>Pre-Order</Text>
                        <Text>Lihat produk pre-order yang bisa dipesan</Text>
                    </View>
                    <Image source={KategoriPre} style={styles.gambarpre} />
                  </Pressable>
                </View>
              }
            />
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
                <View style={{flexDirection: 'column-reverse'}}>
                  <View style={styles.panggil}>
                    <View>
                        <Text style={{fontWeight:'bold', color: Ijo, width: 180}}>Minat sama produknya? Yuk panggil mitra!</Text>
                    </View>
                    <Pressable style={{padding: 10, backgroundColor: Ijo, borderRadius: 10}} 
                    onPress={() => navigation.navigate('LokasiScreen')}>
                        <Text style={{fontWeight:'bold', color:Putih}}>Panggil Mitra</Text>
                    </Pressable>
                  </View>
                </View>
              )
            }
            
          </View>
          )
        }
      </View>
    </View>
  )
}

export default EtalaseScreen

const styles = StyleSheet.create({
    latar:{
      flex: 1,
      backgroundColor: Kuning, 
      padding: 10, 
    },
    gambartoko:{
      width: height * 0.1,
      height: height * 0.1,
      borderRadius: 10,
      borderColor: Ijo,
      borderWidth: 2,
    },
    gambarpre:{
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
      borderRadius: 15,
    },
    judul:{
      fontSize: 18,
      color: Ijo,
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
      padding: 10,
      borderRadius: 10,
      position: 'absolute',
      width: '95%',
      borderColor: Ijo,
      borderWidth: 2,
      margin: 10
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