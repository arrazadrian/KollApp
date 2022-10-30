import { StyleSheet, Text, View, ScrollView, Pressable, Image, ActivityIndicator, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { KollLong, Logo } from '../assets/Images/Index.js'
import { handleSignOut } from '../../API/firebasemethod'
import Ionicons from '@expo/vector-icons/Ionicons';
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const { height, width } = Dimensions.get('window')

const AkunScreen = () => {

  const navigation = useNavigation();

  const pindahEdit = () => {
    navigation.navigate('EditAkunScreen', { 
      nama: namaakun,
      foto: fotoakun,
      phone: phoneakun,
    })
  }

  const handleKeluarAkun =()=> {
    Alert.alert('Anda ingin keluar akun?','Anda akan butuh login kembali untuk masuk.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Ya',
              onPress: handleSignOut,
            }
          ]
          )
  }

  const [namaakun, setNamaakun] = useState()
  const [fotoakun, setFotoakun] = useState('')
  const [phoneakun, setPhoneakun] = useState('Loading...')
  const [emailakun, setEmailakun] = useState('Loading...')
  const auth = getAuth();
  const db = getFirestore(app)

  // useEffect(() =>{
  //   async function getuserAkun(){
  //     try{
  //       const unsubscribe = onSnapshot(doc(db, "pelanggan", auth.currentUser.uid ), (doc) => {
  //       setNamaakun(doc.data().namalengkap);
  //       setFotoakun(doc.data().foto_akun);
  //       setPhoneakun(doc.data().phone);
  //       setEmailakun(doc.data().email);
  //       console.log('getuserAkun jalan (Akun Screen)')
  //         // Respond to data
  //         // ...
  //       });
  //       //unsubscribe();
  //     } catch (err){
  //       Alert.alert('There is an error.', err.message)
  //     }
  //   }
  //   getuserAkun();
  // },[])

  //Dapetin data pelanggan akun, putus listener kalo pindah halaman
  useFocusEffect(
    useCallback(() => {
          const unsubscribe = onSnapshot(doc(db, "pelanggan", auth.currentUser.uid ), (doc) => {
            setNamaakun(doc.data().namalengkap);
            setFotoakun(doc.data().foto_akun);
            setPhoneakun(doc.data().phone);
            setEmailakun(doc.data().email);
            console.log('getuserAkun jalan (Akun Screen)')
            // Respond to data
            // ...
          });
          //unsubscribe();
          return () => {
            console.log('Akun Unmounted') 
            unsubscribe();
          }
    },[])
  );

  return (
    <View style={styles.latar}>
      <ScrollView>
        <View style={styles.atas}>
          <Image source={KollLong} style={styles.logo}/>
        </View>
        <View style={styles.bungkus}>
            
              { !namaakun ? 
              (
              <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                <ActivityIndicator size="large" color={Ijo}/>
              </View>
              ):(
              <View>
                <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Profil</Text>
                  <Pressable  onPress={pindahEdit}>
                      <Ionicons name="settings" size={20} color={Ijo} />
                  </Pressable>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
                { fotoakun ? (
                    <Image source={{uri: fotoakun}} style={styles.foto}/>
                    ):(
                    <Image source={Logo} style={styles.foto}/>
                  )}
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: Putih,}}>{namaakun}</Text>
                        <Text style={{fontSize: 18,color: Putih,}}>Pelanggan</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: Ijo, borderBottomWidth: 1}}>
                  <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Info</Text>
                </View>
                <View style={{padding: 15}}>
                    <View style={{justifyContent:"space-between", marginBottom: 10}}>     
                          <Text style={{color: Putih, fontSize: 15, fontWeight:'bold'}}>No.Handphone</Text> 
                          <Text style={{color: Putih, fontSize: 18}}>{phoneakun}</Text>   
                    </View>
                    <View style={{justifyContent:"space-between", marginBottom: 10}}>     
                          <Text style={{color: Putih, fontSize: 15, fontWeight:'bold'}}>Email</Text> 
                          <Text style={{color: Putih, fontSize: 18}}>{emailakun}</Text>   
                    </View>
                </View>
                <View style={styles.logout}>
                  <Text 
                  style={{fontSize: 20, color: Ijo, fontWeight: 'bold'}}
                  onPress={handleKeluarAkun}
                  >Keluar Akun</Text>
                </View>
              </View>
              )
              }
        </View>
      </ScrollView>
    </View>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  logo:{
    width: width * 0.4,
    height: height * 0.1,
    alignSelf: 'center',
    marginTop: 20,
  },
  atas:{
    height: height * 0.2,
    alignItems:'center', 
    justifyContent:'center'
  },
  foto:{
    width: 100,
    height: 100,
    backgroundColor: Putih,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tulisan:{
    fontSize: 18,
    color: Putih,
  },
  logout:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20, 
  },
  bungkus:{
    backgroundColor: IjoTua,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: height * 0.76,
  },
})