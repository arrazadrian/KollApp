import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView} from 'react-native'
import React from 'react'
import PencarianBar from '../Components/PencarianBar'
import { Ijo, Kuning, Putih, Hitam, Abu, IjoTua, IjoMint } from '../Utils/Warna';
import { LogoPutih, PanggilMitra, TemuLangsung } from '../assets/Image/Index.js';
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
          <View style={{backgroundColor: IjoTua, alignSelf:'center', width:'95%', padding: 10, borderRadius: 20}}>
              <View style={styles.bungkus}>
                <Text style={styles.judul}>Siap Melayani!</Text>
                <Text style={styles.deskripsi}>Yuk pilih kebutuhanmu</Text>
              </View>
              <View style={styles.homeButton}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.judulButton}>Panggil Mitra</Text>
                    <Text style={styles.deskripsiButton}>Mitra akan mendatangimu</Text>
                </View>
                <Image source={PanggilMitra} style={styles.imageButton} />
              </View>
              <View style={styles.homeButton}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.judulButton}>Temu Langsung</Text>
                  <Text style={styles.deskripsiButton}>Ketemu langsung belanja</Text>
                </View>
                <Image source={TemuLangsung} style={styles.imageButton} />
              </View>
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
    textAlign: 'center',
    color: Putih,
  },
  deskripsi:{
    fontSize: 15,
    textAlign: 'center',
    color: Putih,
  },
  judulButton:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Putih,
  },
  deskripsiButton:{
    fontSize: 18,
    color: Putih,
  },
  bungkus:{
    marginBottom:10,
    marginHorizontal: 20,
    marginTop: 2,
    alignSelf: 'center',
  },
  homeButton:{
    backgroundColor: Ijo,
    flexDirection: 'row',
    height: 120,
    width: 350,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    elevation: 5,
  },
  imageButton:{
    width: 120,
    height: 120,
  }
})