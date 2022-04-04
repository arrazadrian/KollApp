import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { Splash } from '../assets/Index'

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
      setTimeout( () =>{
        navigation.replace('Gerbang');
      }, 3000)
  }, [navigation]);

  return (
    <ImageBackground source={Splash} style={styles.background}>

    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})