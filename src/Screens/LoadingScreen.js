import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { Gerobak } from '../assets/Images/Index'

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout( () =>{
      if(menjawab)
      tidakRespon();
    }, 90000)
}, [navigation]);

const tidakRespon = () => {
  navigation.replace('HomeScreen');
  Alert.alert(
    'Mitra tidak merespon','Mohon maaf, sepertinya mitra sedang sibuk.'
  );
};
  
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