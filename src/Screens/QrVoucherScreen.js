import { StyleSheet, Text, View, Image, Pressable, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';
import { Ijo, Kuning, IjoMint, Putih, IjoTua } from '../Utils/Warna'
import { LogoQR } from '../assets/Images/Index.js';
import QRCode from 'react-native-qrcode-svg';
import { app } from '../../Firebase/config';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {  getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import "intl";
import "intl/locale-data/jsonp/id";

const { height, width } = Dimensions.get('window')

const QrVoucherScreen = ({ route }) => {

    const { 
        id_voucher, minimal, potongan,
       } = route.params;

    const [qrvoucher,setQrvoucher] = useState()
    const auth = getAuth();

    useEffect(() =>{
        async function getQRVoucher(){
          try{
              setQrvoucher(id_voucher);
              console.log('getQR jalan (Langsung Screen)')        
          } catch (err){
            Alert.alert('There is an error.', err.message)
          }
        }
        getQRVoucher();
      },[])
  
  return (
    <View style={styles.latar}>
      <Text style={styles.judul}>Tampilkan QR ini sebelum membayar</Text>
      <View style={styles.qr}>
        { qrvoucher ?(
            <QRCode 
            value={qrvoucher} 
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
        <Text style={styles.deskripsi}>
            Minimal belanja sebesar Rp{new Intl.NumberFormat('id-Id').format(minimal).toString()} dengan potongan Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}
        </Text>
    </View>
  )
}

export default QrVoucherScreen

const styles = StyleSheet.create({
    latar:{
        flex:1,
        backgroundColor: IjoTua,
        justifyContent:'center',
        alignItems:'center',
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
      judul:{
        marginTop: 8, 
        color: Putih, 
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign:'center',
      },
      deskripsi:{
        color: Putih, 
        fontSize: 16, 
        textAlign:'center',
        paddingHorizontal: 20,
      },
})