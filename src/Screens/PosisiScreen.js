import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu, Location } from '../assets/Images/Index.js'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const PosisiScreen = ({ route }) => {

  const navigation = useNavigation();

  const { 
    namamitra, namatoko, foto_akun, tempat_mangkal, mangkal,
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
          }}>
          <Marker 
            coordinate={{
              latitude: tempat_mangkal.latitude,
              longitude: tempat_mangkal.longitude,
            }}
              title={namatoko}
              description="Lokasi Mitra"
              pinColor={'tomato'}
            />
          <Marker 
            coordinate={{
              latitude: -6.179503,
              longitude: 106.864818
            }}
              title="Nama Pelanggan"
              description="Lokasi Kamu"
              pinColor={'tan'}
            />
          </MapView>
      </View>
      <View style={styles.kotak}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <View>
                <Image source={{uri: foto_akun}} style={styles.gambar}/>
              </View>
              <View>
                <Text style={{color: Putih, fontSize:18, fontWeight: 'bold'}}>{namatoko}</Text>
                <Text style={{color: Putih, fontSize:14}}>200m | 20 menit </Text>
                <Text style={{color: Putih, fontSize:12}}>Waktu keliling: 10.00 - 15.00</Text>
              </View>
          </View>
          <Pressable style={styles.tombolpanggil}>
            <Text style={{color: Putih, fontWeight: 'bold',  fontSize: 16}}>Lihat Produk</Text>
          </Pressable> 
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
    height: height* 0.28,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  gambar:{
    width: height * 0.15,
    height: height * 0.15,
    borderRadius: 20,
    marginRight: 15,
  },
  tombolproduk:{
    backgroundColor: Ijo,
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    marginRight: 10,
  },
  tombolpanggil:{
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: Ijo,
  },
  mangkal:{
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  peta:{
    width: '100%',
    height: height* 0.85,
  },
})