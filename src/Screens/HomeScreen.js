import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, StatusBar, Alert, ActivityIndicator } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { Logo, PanggilMitra, TemuLangsung, Pinkecil } from '../assets/Images/Index.js';
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { updateUID } from '../features/pelangganSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { updatePosisi } from '../features/posisiSlice';
import GarisBatas from '../Components/GarisBatas';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const HomeScreen = ({navigation}) => {

  const [namapelanggan, setNamapelanggan] = useState('Loading...')
  const [kodeUID, setKodeUID] = useState('')
  const auth = getAuth();
  const db = getFirestore(app)

  const { geo, alamat, geohash } = useSelector(state => state.posisi);
  const dispatch = useDispatch();

  const geofire = require('geofire-common');
 
 
  // useEffect(() =>{ 
  //   async function getuserHome(){
  //     try{
  //       const unsubscribe = onSnapshot(doc(db, "pelanggan", auth.currentUser.uid ), (doc) => {
  //       setKodeUID(auth.currentUser.uid);
  //       setNamapelanggan(doc.data().namalengkap);
  //       //console.log(doc.data())
  //       console.log('getuserHome jalan (Home Screen)')
  //         // Respond to data
  //         // ...
  //       });
  //       //unsubscribe();
  //     } catch (err){
  //       Alert.alert('There is an error.', err.message)
  //     }
  //   }
  //   getuserHome();
  //   dispatch(updateUID({kodeUID,namapelanggan}));
  // },[namapelanggan])
 
  //Dapetin nama pelanggan dan uid buat home, putus listener kalo pindah halaman
  useFocusEffect(
    useCallback(() => {
          const unsubscribe = onSnapshot(doc(db, "pelanggan", auth.currentUser.uid ), (doc) => {
          setKodeUID(auth.currentUser.uid);
          setNamapelanggan(doc.data().namalengkap);
          //console.log(doc.data())
          console.log('getuserHome jalan (Home Screen)')
          dispatch(updateUID({kodeUID,namapelanggan}));
            // Respond to data
            // ...
          });
          //unsubscribe();
          return () => {
            console.log('Home Unmounted') 
            unsubscribe();
          }
    },[namapelanggan])
  );

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  //Dapetin Lokasi Pelanggan saat ini
  useEffect(() => {
    (async () => {
      
      if(alamat == null){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        // console.log("Lat: " +location.coords.latitude);
        // console.log("Lng: " +location.coords.longitude);
  
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}
          &location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_MAPS_APIKEY}`
        ).then((res) => res.json())
        .then((data) => {
         // console.log(data)
         if(!data.results[0]?.formatted_address){
           dispatch(updatePosisi({
             geo: {lat:location.coords.latitude, lng:location.coords.longitude},
             alamat: "Nama jalan belum terdaftar",
             geohash: geofire.geohashForLocation([location.coords.latitude,location.coords.longitude])
           }));
          } else {
           dispatch(updatePosisi({
             geo: {lat:location.coords.latitude, lng:location.coords.longitude},
             alamat: data.results[0]?.formatted_address,
             geohash: geofire.geohashForLocation([location.coords.latitude,location.coords.longitude])
           }));
         }
        })
      }

    })();
  }, []); 
  
  // console.log(geo);
  // console.log(alamat);
  // console.log(geohash);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  return (
    <View style={styles.latar}> 
    { !alamat ? 
    (
      <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
           <ActivityIndicator size="large" color={IjoTua}/>
           <Text style={{textAlign:'center', color: Ijo, fontSize: 18, marginTop: 10}}>Mencari lokasi kamu...</Text>
      </View>
    ):(
    <View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('RatingScreen')}>
          <Image source={Logo} style={styles.logopojok} />
        </Pressable>
        <View>
          <Text style={{color:Ijo, fontSize:18}}>Selamat datang!</Text>
          <Text style={{color:Ijo, fontSize:20, fontWeight:'bold'}}>{namapelanggan}</Text>
        </View>
      </View>
      <ScrollView>
          <View style={{paddingHorizontal: 20}}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[styles.judul,{fontSize: 16}]}>Lokasi Kamu</Text>
                    </View>
                    {alamat ? (
                      <Pressable style={{marginBottom:15, flexDirection:'row', alignItems:'center'}}
                      onPress={() => navigation.navigate('FLocScreen')}
                      >
                        <View style={{flexDirection:'row', alignItems:'center', width: width * 0.8, marginRight: 20}}>
                          <Image source={Pinkecil} style={styles.sampingalamat} />
                          <Text style={styles.deskripsi} numberOfLines={2}>{alamat}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={15} color={IjoMint}/>
                      </Pressable>
                    ):(
                      <Pressable style={{marginBottom:15, flexDirection:'row', alignItems:'center'}}
                      onPress={() => navigation.navigate('FLocScreen')}
                      >
                        <View style={{flexDirection:'row', alignItems:'center', width: width * 0.8, marginRight: 20}}>
                          <Image source={Pinkecil} style={styles.sampingalamat} />
                          <Text style={[styles.deskripsi,{fontSize: 18}]}>Tentukan lokasi kamu saat ini...</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={15} color={IjoMint}/>
                      </Pressable>
                    )}
                  </View>
                  <View style={styles.bungkus}>
                    <Text style={[styles.judul,{textAlign:'center'}]}>Siap Melayani!</Text>
                    <Text style={[styles.deskripsi,{fontSize: 16, textAlign:'center'}]}>Yuk pilih kebutuhanmu</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Pressable onPress={() => navigation.navigate('SekitarScreen')}>
                          <View style={styles.homeButton}>
                            <Image source={PanggilMitra} style={styles.imageButton} />
                            <View>
                                <Text style={styles.judulButton}>Pilih Mitra</Text>
                            </View>
                          </View>
                      </Pressable>
                      <Pressable onPress={() => navigation.navigate('LangsungScreen')}>
                          <View style={styles.homeButton}>
                            <Image source={TemuLangsung} style={styles.imageButton} />
                            <View>
                              <Text style={styles.judulButton}>Temu Langsung</Text>
                            </View>
                          </View>
                      </Pressable>
                  </View>
          </View>
      </ScrollView>
    </View>
    )}
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
  sampingalamat:{
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
    fontSize: 14,
    color: Ijo,
  },
  judulButton:{
    fontSize: 14,
    fontWeight: 'bold',
    color: Ijo,
  },
  bungkus:{
    marginBottom:10,
    marginTop: 2,
  },
  homeButton:{
    backgroundColor: Putih,
    height: height * 0.2,
    width: width * 0.42,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    padding: 10,
  },
  imageButton:{
    width: width * 0.28,
    height: width * 0.28,
  }
})