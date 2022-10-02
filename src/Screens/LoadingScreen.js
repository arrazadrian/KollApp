import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { Gerobak } from '../assets/Images/Index'
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';


const LoadingScreen = ({ navigation, route }) => {

  const [panggilan, setPanggilan] = useState("Menunggu Respon");
  const db = getFirestore(app);

  const { 
    id_transaksi
     } = route.params;

  useEffect(() =>{ 
    async function getStatusPM(){
      try{
        const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
        setPanggilan(doc.data().panggilan);
          // Respond to data
          // ...
        });
        //unsubscribe();
      } catch (err){
        Alert.alert('Ada error sama status PM.', err.message)
      }
    }
    getStatusPM();
  },[]);

  useEffect(() => {
    const lihatRespon = () => {
      if(panggilan == "Diterima"){
          navigation.navigate('OtwScreen');
      } else if(panggilan == "Ditolak"){
          navigation.navigate('HomeScreen');
          Alert.alert(
            'Mitra menolak panggilan','Mohon maaf, sepertinya mitra sedang sibuk saat ini.'
          );
      } else {
        const waktuNunggu = setTimeout( () =>{
          navigation.navigate('HomeScreen');
          Alert.alert(
            'Mitra tidak merespon','Mohon maaf, sepertinya mitra sedang sibuk saat ini.'
          );
        }, 600000);
        // 1 minute =  60 seconds = 60000 miliseconds
        // 10 minutes = 600000 ms
        return() => clearTimeout(waktuNunggu); 
      }
    }
    lihatRespon();
  },[panggilan]);
  
  return (
    <View style={styles.latar}>
        <Image source={Gerobak} style={styles.gerobak} />
        <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 18}}>Menunggu respon mitra</Text>
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
        width: 200,
        height: 130,
        marginBottom: 10,
    }
})