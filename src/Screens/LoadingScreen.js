import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { Gerobak } from '../assets/Images/Index'
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';


const LoadingScreen = ({ navigation }) => {

  const [panggilan, setPanggilan] = useState("Menunggu Respon");
  const db = getFirestore(app);

  useEffect(() =>{ 
    async function getStatusPM(){
      try{
        const unsubscribe = onSnapshot(doc(db, "transaksi", auth.currentUser.uid ), (doc) => {
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
        }, 90000);
        return() => clearTimeout(waktuNunggu); 
      }
    }
    lihatRespon();
  },[]);
  
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