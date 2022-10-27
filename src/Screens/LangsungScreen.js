import { StyleSheet, Text, View, Image, Pressable, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';
import { Ijo, Kuning, IjoMint, Putih, IjoTua } from '../Utils/Warna'
import { LogoQR, meetup } from '../assets/Images/Index.js';
import QRCode from 'react-native-qrcode-svg';
import { app } from '../../Firebase/config';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {  getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const LangsungScreen = () => {

  const navigation = useNavigation();
  const { potongan } = useSelector(state => state.voucher);
  const [qr,setQR] = useState()
  const auth = getAuth();

  useEffect(() =>{
    async function getQR(){
      try{
          setQR(auth.currentUser.uid);
          console.log('getQR jalan (Langsung Screen)')        
      } catch (err){
        Alert.alert('There is an error.', err.message)
      }
    }
    getQR();
  },[])

  const VoucerPromo = () => {
    return(
      <Pressable style={styles.promo} onPress={pindahVoucher}>
          <View style={{backgroundColor: Ijo, padding: 8, borderRadius: 20}}>
            <Ionicons name="pricetags" size={15} color={IjoMint}/>
          </View>
          { potongan ? (
            <Text style={[styles.judul, {color:Ijo}]}>Voucher Rp{potongan}</Text>
            ):(
            <Text style={[styles.judul, {color:Ijo}]}>Pilih Voucher</Text>
          )
          }
          <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
      </Pressable>
    )
  };

  const pindahVoucher = () => {
    navigation.navigate('VoucherScreen', {
      jenis_layanan: "Temu Langsung",
    })
  }

  return (
    <View style={styles.latar}>
      <View style={styles.tulisan}>
          <Text style={{marginTop: 8, color: Putih, fontSize: 22, fontWeight: 'bold', textAlign:'center'}}>QR Code Kamu</Text>
          <Text style={{color: Putih, fontSize: 16, textAlign:'center'}}>
            Berikan QR Code ini kepada mitra pada akhir transaksi temu langsung
          </Text>
      </View>
      <View style={styles.qr}>
        { qr ?(
          <QRCode 
          value={qr} 
          size={240}
          logo={LogoQR}
          logoBackgroundColor={Putih}
          logoSize={33}
          />
        ):(
          <ActivityIndicator size="large" color={Ijo}/>
        )
        }
            
      </View>
      <View style={styles.bawah}>
        <View style={{flex: 1}}>
            <Image source={meetup} style={styles.gambar} />
        </View>
        <View  style={{flex: 1}}>
            <Text style={{flexWrap:'wrap', color: Ijo, fontSize: 16}}>
              Yuk lihat ada promo apa hari ini!
            </Text>
            <VoucerPromo/>
        </View>
      </View>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
  },
  qr:{
    backgroundColor: Putih,
    height: width * 0.8,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  bawah:{
    position:'absolute',
    width: width,
    height: height * 0.2,
    bottom: 0,
    padding: 20,
    flexDirection: 'row',
    flexWrap:'wrap',
    backgroundColor: Kuning,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  gambar:{
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  tulisan:{
    alignSelf:'center',
    width: width * 0.8,
    marginTop: height * 0.04,
  },
  promo:{
    flexDirection:'row',
    borderColor: Ijo,
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    alignItems:'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});