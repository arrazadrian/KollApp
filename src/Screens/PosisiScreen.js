import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu, Location } from '../assets/Images/Index.js'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const PosisiScreen = ({ route }) => {

  const navigation = useNavigation();

  const { 
    namamitra, namatoko, foto_akun, tempat_mangkal,
     } = route.params;

  return (
    <View style={styles.latar}>
      <View>
            <MapView style={styles.peta} 
            initialRegion={{
              latitude: tempat_mangkal.latitude,
              longitude: tempat_mangkal.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            >
              <Marker 
              coordinate={{
                latitude: tempat_mangkal.latitude,
                longitude: tempat_mangkal.longitude,
              }}
              title={namatoko}
              description="Lokasi Mitra"
              pinColor={'red'}
              />
            
            </MapView>
      </View>
      <View style={styles.kotak}>
            <View style={{flexDirection:'row'}}>
                <View>
                  <Image source={{uri: foto_akun}} style={styles.gambar}/>
                </View>
                <View style={{paddingHorizontal:10}}>
                  <Text style={{color: Putih, fontSize:18, fontWeight: 'bold'}}>{namatoko}</Text>
                  <Text style={{color: Putih, fontSize:16}}>
                      <Text>200m</Text>
                      <Text> | </Text>
                      <Text>20 menit</Text>
                  </Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Pressable style={styles.tombolproduk} onPress={() => navigation.push('ProdukScreen')}>
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
    position:'absolute',
    bottom:0,
    width: '100%',
    backgroundColor: IjoTua,
    padding: 20,
    height: height*(1/5),
  },
  gambar:{
    width: height * 0.12,
    height: height * 0.12,
    borderRadius: 10,
    padding: 20,
  },
  tombolproduk:{
    backgroundColor: Ijo,
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    marginRight: 10,
  },
  tombolpanggil:{
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    marginTop: 10,
    borderColor: Ijo,
    borderWidth: 2,
  },
  peta:{
    width: '100%',
    height: height*(4/5),
  },
})