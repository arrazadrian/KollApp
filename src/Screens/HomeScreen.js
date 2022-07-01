import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import PencarianBar from '../Components/PencarianBar'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { Logo, PanggilMitra, TemuLangsung, Location } from '../assets/Images/Index.js';
import CarouselHome from '../Components/CarouselHome'
import { tigaGambar } from '../Data/data.js';

const { height, width } = Dimensions.get('window')

const HomeScreen = ({navigation, item}) => {
// const HomeScreen = ({item}) => {
  return (
    <View style={styles.latar}> 
      <View style={styles.container}>
        <View>
          <Image source={Logo} style={styles.logopojok} />
        </View>
        <View>
          <Text style={{color:Ijo, fontSize:18}}>Selamat datang!</Text>
          <Text style={{color:Ijo, fontSize:20, fontWeight:'bold'}}>Annisa Rifani</Text>
        </View>
      </View>
      <ScrollView>
         {/* <View>
              <CarouselHome data={ tigaGambar } /> 
          </View>
          */}
          <View style={{paddingHorizontal: 20}}>
                  <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.judul}>Lokasi Kamu</Text>
                        <Text style={{color:Ijo,fontSize:18,fontWeight:'bold', textDecorationLine:'underline'}}
                        onPress={() => navigation.navigate('FLocScreen')}
                        >
                          Ubah
                          </Text>
                    </View>
                    <View style={{marginVertical:5, flexDirection:'row', alignItems:'center'}}>
                      <Image source={Location} style={styles.location} />
                      <Text style={styles.deskripsi}>Jl. Skripsi Cepat Lulus No.1</Text>
                    </View>
                  </View>
                  <View style={styles.bungkus}>
                    <Text style={styles.judul}>Siap Melayani!</Text>
                    <Text style={styles.deskripsi}>Yuk pilih kebutuhanmu</Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate('SekitarScreen')}>
                      <View style={styles.homeButton}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.judulButton}>Panggil Mitra</Text>
                            <Text style={styles.deskripsiButton}>Mitra akan mendatangimu</Text>
                        </View>
                        <Image source={PanggilMitra} style={styles.imageButton} />
                      </View>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('LangsungScreen')}>
                      <View style={styles.homeButton}>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.judulButton}>Temu Langsung</Text>
                          <Text style={styles.deskripsiButton}>Ketemu langsung belanja</Text>
                        </View>
                        <Image source={TemuLangsung} style={styles.imageButton} />
                      </View>
                  </Pressable>
          </View>
      </ScrollView>
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
  location:{
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
    fontSize: 18,
    color: Ijo,
  },
  judulButton:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Ijo,
  },
  deskripsiButton:{
    fontSize: 18,
    color: IjoTua,
  },
  bungkus:{
    marginBottom:10,
    marginTop: 2,
  },
  homeButton:{
    backgroundColor: Putih,
    flexDirection: 'row',
    height: 120,
    width: '100%',
    marginBottom: 10,
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