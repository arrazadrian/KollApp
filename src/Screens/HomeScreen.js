import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, StatusBar, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { Logo, PanggilMitra, TemuLangsung, Location } from '../assets/Images/Index.js';
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { updateUID } from '../features/pelangganSlice';

const { height, width } = Dimensions.get('window')

const HomeScreen = ({navigation}) => {

  const [namapelanggan, setNamapelanggan] = useState('Loading...')
  const [kodeUID, setKodeUID] = useState('')
  const auth = getAuth();
  const db = getFirestore(app)

  const { alamat } = useSelector(state => state.posisi);
  const dispatch = useDispatch();

  useEffect(() =>{ 
    async function getuserHome(){
      try{
        const unsubscribe = onSnapshot(doc(db, "pelanggan", auth.currentUser.uid ), (doc) => {
        setKodeUID(auth.currentUser.uid);
        setNamapelanggan(doc.data().namalengkap);
        console.log('getuserHome jalan (Home Screen)')
          // Respond to data
          // ...
        });
        //unsubscribe();
      } catch (err){
        Alert.alert('There is an error.', err.message)
      }
    }
    getuserHome();
    dispatch(updateUID({kodeUID,namapelanggan}))
  },[namapelanggan])


  return (
    <View style={styles.latar}> 
      <View style={styles.container}>
        <View>
          <Image source={Logo} style={styles.logopojok} />
        </View>
        <View>
          <Text style={{color:Ijo, fontSize:18}}>Selamat datang!</Text>
          <Text style={{color:Ijo, fontSize:20, fontWeight:'bold'}}>{namapelanggan}</Text>
        </View>
      </View>
      <ScrollView>
          <View style={{paddingHorizontal: 20}}>
                  <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.judul}>Lokasi Kamu</Text>
                        <Text style={{color:Ijo,fontSize:16,fontWeight:'bold', textDecorationLine:'underline'}}
                        onPress={() => navigation.navigate('FLocScreen')}
                        >
                          Ubah
                          </Text>
                    </View>
                    {alamat ? (
                      <Pressable style={{marginVertical:5, flexDirection:'row', alignItems:'center', width: width * 0.8}}
                      onPress={() => navigation.navigate('FLocScreen')}
                      >
                        <Image source={Location} style={styles.location} />
                        <Text style={styles.deskripsi} numberOfLines={2}>{alamat}</Text>
                      </Pressable>
                    ):(
                      <Pressable style={{marginVertical:5, flexDirection:'row', alignItems:'center'}}
                      onPress={() => navigation.navigate('FLocScreen')}
                      >
                        <Image source={Location} style={styles.location} />
                        <Text style={[styles.deskripsi,{fontSize: 18}]}>Tentukan lokasi kamu saat ini...</Text>
                      </Pressable>
                    )}
                   
                  </View>
                  <View style={styles.bungkus}>
                    <Text style={styles.judul}>Siap Melayani!</Text>
                    <Text style={styles.deskripsi}>Yuk pilih kebutuhanmu</Text>
                  </View>

                  {!alamat ? (
                    <Pressable onPress={() => navigation.navigate('SekitarScreen')}
                      disabled={!alamat}
                    >
                        <View style={[styles.homeButton, {opacity:0.6}]}>
                          <View style={{flex: 2}}>
                              <Text style={styles.judulButton}>Panggil Mitra</Text>
                              <Text style={styles.deskripsiButton}>Tulis dulu yuk lokasi mu</Text>
                          </View>
                          <Image source={PanggilMitra} style={styles.imageButton} />
                        </View>
                    </Pressable>
                  ):(
                    <Pressable onPress={() => navigation.navigate('SekitarScreen')}
                    >
                        <View style={styles.homeButton}>
                          <View style={{flex: 2}}>
                              <Text style={styles.judulButton}>Panggil Mitra</Text>
                              <Text style={styles.deskripsiButton}>Mitra akan mendatangimu</Text>
                          </View>
                          <Image source={PanggilMitra} style={styles.imageButton} />
                        </View>
                    </Pressable>
                  )}
                  <Pressable onPress={() => navigation.navigate('LangsungScreen')}>
                      <View style={styles.homeButton}>
                        <View style={{flex: 2}}>
                          <Text style={styles.judulButton}>Temu Langsung</Text>
                          <Text style={styles.deskripsiButton}>Ketemu langsung belanja</Text>
                        </View>
                        <Image source={TemuLangsung} style={styles.imageButton} />
                      </View>
                  </Pressable>
          </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  logopojok:{
    width: 50,
    height: 50,
  },
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  location:{
    width:20,
    height:20,
    marginRight:5,
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: Ijo,
  },
  judulButton:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Ijo,
  },
  deskripsiButton:{
    fontSize: 16,
    color: IjoTua,
  },
  bungkus:{
    marginBottom:10,
    marginTop: 2,
  },
  homeButton:{
    backgroundColor: Putih,
    flexDirection: 'row',
    height: 120,
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    padding: 10
  },
  imageButton:{
    width: width * 0.27,
    height: width * 0.27,
    flex: 1,
  }
})