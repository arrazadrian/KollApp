import {StyleSheet, Text, View, Image, Pressable, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna'
import PencarianBar from '../Components/PencarianBar'
import ListPreOrder from '../Components/ListPreOrder'
import { Bag, Bawah, KollLong } from '../assets/Images/Index.js';
import { daftarpreproduk } from '../Data/daftarpreproduk'
import Keranjang from '../Components/Keranjang'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

ataspreorder = () => {
  return(
    <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', }}>
            <Image source={KollLong} style={{width: 80, height:50}} /> 
            <PencarianBar/>
        </View>
        <View style={styles.bungkus}>
            <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold',color: Ijo}}>Kapan Harus Pre-Order?</Text>
            <Text style={{textAlign:'center', fontSize: 16 }}>
              Pre-Order yang dilakukan setelah pukul 18.00 WIB akan 
              dikirim lusa. Sementara Pre-Order yang dipesan sebelum 
              waktu tersebut akan dikirim keesokan harinya.
            </Text>
        </View>
        <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Produk Pre-Order</Text>
        </View>
    </View>
  )
}


const PreorderScreen = ({ route }) => {

  const[produkpreorder,setProdukpreorder] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const navigation = useNavigation();

  useEffect(()=>{
    const fetchProdukPreOrder = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", id_mitra);
        const colRef = collection(docRef, "produk")

        const q = query(colRef, where("jenis", "==", "Produk pre-order"), orderBy("waktudibuat","desc"));
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
  },[])

  const { 
    id_mitra
     } = route.params;

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
                renderItem= {({item}) => <ListPreOrder item={item} />}
                keyExtractor={ produkpreorder => produkpreorder.id}
                columnWrapperStyle={{justifyContent:'space-evenly'}}
                ListHeaderComponent={ataspreorder}
                ListEmptyComponent={<Text>Produk pre-order tidak tersedia</Text>}
                ListFooterComponent={
                <View>
                  <Image source={Bawah} style={styles.bawah}/>
                </View>
                }
            /> 
          <View style={{flexDirection:'column-reverse'}}>
              <Keranjang/>
          </View>
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
    padding: 20,
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