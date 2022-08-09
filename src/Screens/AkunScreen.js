import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { KollLong, Logo } from '../assets/Images/Index.js'
import { handleSignOut } from '../../API/firebasemethod'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'

const AkunScreen = () => {

  const navigation = useNavigation();

  const pindahEdit = () => {
    navigation.navigate('EditAkunScreen', { 
      nama: namaakun,
      foto: fotoakun,
      phone: phoneakun,
    })
  }

  const [namaakun, setNamaakun] = useState('Loading...')
  const [fotoakun, setFotoakun] = useState('')
  const [phoneakun, setPhoneakun] = useState('Loading...')
  const [emailakun, setEmailakun] = useState('Loading...')
  const auth = getAuth();
  const db = getFirestore(app)

  useEffect(() =>{
    async function getuserAkun(){
      try{
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
      } catch (err){
        Alert.alert('There is an error.', err.message)
      }
    }
    getuserAkun();
  },[])

  return (
    <SafeAreaView style={styles.latar}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Image source={KollLong} style={styles.logo}/>
      </View>
      <View style={styles.bungkus}>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10 }}>
              <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Profil</Text>
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
                    <Pressable  onPress={pindahEdit} >
                        <View style={styles.edit}>
                          <Text style={{color: Putih, fontSize: 18, fontWeight:'bold'}}>Atur Profil</Text>
                        </View>
                    </Pressable>
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
              onPress={handleSignOut}
              >Keluar Akun</Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  logo:{
    width: 150,
    height: 75,
    alignSelf: 'center',
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
  edit:{
    borderColor: Ijo,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    flex: 3,
  },
})