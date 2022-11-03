import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, Dimensions } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { Gerobak } from '../assets/Images/Index'
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import { noRespon } from '../../API/firebasemethod';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const LoadingScreen = ({ navigation, route }) => {

  const [panggilan, setPanggilan] = useState();
  const db = getFirestore(app);

  const { 
    id_transaksi, id_mitra,
     } = route.params;

  useFocusEffect(
    useCallback(() => {
        const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
        setPanggilan(doc.data().panggilan);
        console.log('Menunggu respon mitra di loading')
         if(panggilan == "Diterima"){
            navigation.replace('OtwScreen',{
            id_transaksi: id_transaksi,
            id_mitra: id_mitra,
          });
          } else if(panggilan == "Ditolak"){
            navigation.replace('HomeScreen');
            Alert.alert(
              'Mitra menolak panggilan','Mohon maaf, sepertinya mitra sedang sibuk saat ini.'
            );
          } 
          });
          //unsubscribe();
          return () => {
            console.log('Loading Unmounted') 
            unsubscribe();
          }
    },[panggilan])
  );

  useEffect(()=>{
    const waktuNunggu = setTimeout(  () =>{
      clearTimeout(waktuNunggu);
      noRespon(id_transaksi);
      Alert.alert(
        'Mitra tidak merespon','Mohon maaf, sepertinya mitra sedang sibuk saat ini.',
        [
          {
            text: 'Tutup',
            onPress: () => {
              navigation.replace('HomeScreen')
            }
          },
        ]
      );
    }, 90000);
    // 1 minute =  60 seconds = 60000 miliseconds
    // 10 minutes = 600000 ms
    return() => clearTimeout(waktuNunggu); 
  },[]);
  
  return (
    <View style={styles.latar}>
        <Image source={Gerobak} style={styles.gerobak} />
        <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 18, color: Ijo}}>Menunggu respon mitra</Text>
        </View>
        <ActivityIndicator size="large" color={Ijo} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gerobak:{
        width: width * 0.5,
        height: height * 0.25,
        marginBottom: 10,
    }
})