import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ijo, Kuning, Hitam, Putih, IjoTua } from '../Utils/Warna'
import { LogoQR, meetup } from '../assets/Images/Index.js'
import QRCode from 'react-native-qrcode-svg'
import { app } from '../../Firebase/config';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {  getAuth } from "firebase/auth";

const { height, width } = Dimensions.get('window')

const LangsungScreen = () => {
  
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
            <Text style={{flexWrap:'wrap', color: Ijo, fontSize: 18, fontWeight:'bold'}}>
              Dapatkan struk dari hasil belanja kamu lewat QR Code ini.
            </Text>
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
    height: width * 0.7,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius: 20,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  gambar:{
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  tulisan:{
    alignSelf:'center',
    width: width * 0.8,
    marginTop: height * 0.1,
  },
  tombol:{
    backgroundColor: Ijo,
    width: width * 0.8,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});