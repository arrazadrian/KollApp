import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native'
import React from 'react'
import PencarianBar from '../Components/PencarianBar'
import { Ijo, Kuning, Putih } from '../Utils/Warna';
import { LogoPutih } from '../assets/Image/Index.js';
import CarouselHome from '../Components/CarouselHome'
import { tigaGambar } from '../Data/data.js';

const HomeScreen = () => {
// const HomeScreen = ({item}) => {
  return (
    <View style={styles.latar}> 
      <View style={styles.container}>
        <Image source={LogoPutih} style={styles.logopojok} />
        <PencarianBar />
      </View>
      <View>
       { /* <CarouselHome data={ tigaGambar } /> */}  
      </View> 
      <View style={styles.bungkus}>
      <Text style={styles.judul}>Siap Datang!</Text>
      <Text style={styles.deskripsi}>Kami Siap Membantu Anda </Text>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: Ijo,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logopojok:{
    marginLeft: 5,
    marginTop: 15,
    width: 50,
    height: 50,
  },
  latar:{
    flex: 1,
    backgroundColor: Putih,
  },
  judul:{
    fontSize: 25,
    fontWeight: 'bold',

  },
  deskripsi:{
    fontSize: 15,
  },
  bungkus:{
    marginLeft: 20,
    marginTop: 20,
  }
})