import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, {useEffect} from 'react'
import { Splash } from '../assets/Index'
import { Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const SplashScreen = ({ navigation }) => {  
  useEffect(() => {
      setTimeout( () =>{
        navigation.replace('Gerbang');
      }, 3000)
  }, [navigation]);

  return (
    <View>
      <Image source={Splash} style={styles.gambar} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Kuning,
  },
  gambar:{
    flex:1,
    position:`absolute`,
    height: height,
    width: width,
  }
})