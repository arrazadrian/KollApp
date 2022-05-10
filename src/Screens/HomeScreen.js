import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView} from 'react-native'
import React from 'react'
import PencarianBar from '../Components/PencarianBar'
import { Ijo, Kuning, Putih, Hitam, Abu } from '../Utils/Warna';
import { LogoPutih } from '../assets/Image/Index.js';
import CarouselHome from '../Components/CarouselHome'
import { tigaGambar } from '../Data/data.js';
import ListMitra from '../Components/ListMitra';

const HomeScreen = ({navigation, item}) => {
// const HomeScreen = ({item}) => {
  return (
    <View style={styles.latar}> 
      <View style={styles.container}>
        <Image source={LogoPutih} style={styles.logopojok} />
        <PencarianBar />
      </View>
      <ScrollView>
          <View>
            <CarouselHome data={ tigaGambar } /> 
          </View> 
          <View style={styles.bungkus}>
            <Text style={styles.judul}>Siap Datang!</Text>
            <Text style={styles.deskripsi}>Kami siap ke lokasi anda</Text>
          </View>
          <View>
            <ListMitra onPress={() => navigation.navigate('DalamMitra')}/>
          </View>
      </ScrollView>
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
    backgroundColor: Kuning,
  },
  judul:{
    fontSize: 25,
    fontWeight: 'bold',

  },
  deskripsi:{
    fontSize: 15,
  },
  bungkus:{
    marginBottom:10,
    marginHorizontal: 20,
    marginTop: 2,
  }
})