import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu, Location } from '../assets/Images/Index.js'
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window')

const PosisiScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <View>
            <MapView style={styles.peta} 
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            >
              <Marker 
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
              }}
              title="Koll"
              description="Lokasi Mitra"
              pinColor={'tan'}
              />
            
            </MapView>
      </View>
      <View style={styles.kotak}>
            <View style={{flexDirection:'row'}}>
                <View>
                  <Image source={DPkartu} style={styles.gambar}/>
                </View>
                <View style={{paddingHorizontal:20}}>
                  <Text style={{color: Putih, fontSize:20, fontWeight: 'bold'}}>Sayur Aa Anri</Text>
                  <Text style={{color: Putih, fontSize:16}}>
                      <Text>200m</Text>
                      <Text> | </Text>
                      <Text>20 menit</Text>
                  </Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <Pressable style={styles.tombolproduk} onPress={() => navigation.push('KategoriScreen')}>
                    <Text style={{color: Putih, fontWeight: 'bold'}}>Lihat Produk</Text>
                  </Pressable>
                  <Pressable style={styles.tombolpanggil} onPress={() => navigation.push('LokasiScreen')}>
                    <Text style={{color: Putih, fontWeight: 'bold'}}>Panggil Mitra</Text>
                  </Pressable>
                  </View>
                </View>
            </View>
      </View>
    </View>
  )
}



export default PosisiScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  kotak:{
    width: '100%',
    backgroundColor: IjoTua,
    padding: 20,
    height: height*(1/3),
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 20,
  },
  tombolproduk:{
    backgroundColor: Ijo,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginRight: 30,
  },
  tombolpanggil:{
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderColor: Ijo,
    borderWidth: 2,
  },
  peta:{
    width: '100%',
    height: height*(2/3),
  },
})