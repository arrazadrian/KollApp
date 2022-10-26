import { Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListMitra from '../Components/ListMitra'
import { Ijo, Kuning, Hitam, Putih, IjoTua, IjoMint } from '../Utils/Warna'
import { getFirestore, collection, query, where, getDocs,} from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useSelector } from 'react-redux';
import { noMitra } from '../assets/Images/Index';
import VoucherAktif from '../Components/VoucherAktif';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height, width } = Dimensions.get('window')

const VoucherScreen = ({ route }) => {

  const { 
      jenis_layanan, hargatotalsemua,
     } = route.params;

  // console.log(hargatotalsemua)

  const [promosi, setPromosi] = useState();
  const db = getFirestore(app)

  useEffect(() =>{
    let unmounted = false;
    const listPromosi = []; 
    const fetcVoucherPO = async () =>{
      const q = query(collection(db, "promosi"), where("jenis_layanan", "==", jenis_layanan), where("jml_pengguna","<=", 20));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const {potongan, minimal, jml_pengguna, jenis_layanan} = doc.data();
        listPromosi.push({
          id: doc.id,
          potongan, 
          minimal, 
          jml_pengguna,
          jenis_layanan,
        });
      });
      if(!unmounted){
        setPromosi(listPromosi)
     };
    }

    fetcVoucherPO();
    return() => {
      unmounted = true
      console.log('Voucher Unmounted')
    }
  },[])

  const kosongVoucher = () =>{
    return(
      <View style={{alignItems:'center', justifyContent:'center', flex: 1}}>
          <View style={styles.pricetag}>
            <Ionicons name="pricetags" size={60} color={IjoMint}/>
          </View>
          <Text style={{color: Ijo, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Tidak ada voucher tersedia</Text>
      </View>
    )
  };
  
  return (
    <View style={styles.latar}>
      {!promosi ? 
        (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
            <ActivityIndicator size="large" color={IjoTua}/>
        </View>
        ):(
        <FlatList
                data={promosi}
                renderItem= {({item}) => <VoucherAktif item={item}/>}
                keyExtractor={ item => item.id}
                ListEmptyComponent={kosongVoucher}
            /> 
        )
      }
    </View>
  )
}

export default VoucherScreen

const styles = StyleSheet.create({
    latar:{
        flex:1,
        backgroundColor: Kuning,
    },
    pricetag:{
      backgroundColor: Ijo, 
      padding: 10,
      borderRadius: 50, 
      width: width * 0.3, 
      height: width * 0.3,
      justifyContent:'center',
      alignItems: 'center',
      marginTop: height * 0.3,
      marginBottom: 10,
    }
});