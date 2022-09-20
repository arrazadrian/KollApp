import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu, Gerobak, KategoriPre, Location } from '../assets/Images/Index.js'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import GarisBatas from '../Components/GarisBatas';

const { height, width } = Dimensions.get('window')

const EtalaseScreen = ({ route }) => {

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
          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
              <View>
                <Image source={{uri: foto_akun}} style={styles.fototoko}/>
              </View>
              <View>
                <Text style={{color: Putih, fontSize:20, fontWeight: 'bold'}}>{namatoko}</Text>
                <Text style={{color: Putih, fontSize:14}}>200m | 20 menit </Text>
                <Text style={{color: Putih, fontSize:12}}>Waktu keliling: 10.00 - 15.00</Text>
              </View>
          </View>
          <Garis/>
          <Text style={{color: Putih, fontSize:18, fontWeight: 'bold'}}>Produk Mitra</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
              <Pressable style={styles.tombolproduk}>
                <Image source={Gerobak} style={styles.gambar}/>
                <Text style={styles.tulisanproduk}>Produk Utama</Text>
              </Pressable>
              <Pressable style={styles.tombolproduk}>
              <Image source={KategoriPre} style={styles.gambar}/>
                <Text style={styles.tulisanproduk}>Produk Pre-Order</Text>
              </Pressable>
          </View>
          <Pressable style={styles.tombolpanggil} onPress={()=> navigation.goBack()}>
            <Text style={{color: Putih, fontWeight: 'bold',  fontSize: 16}}>Panggil Mitra</Text>
          </Pressable> 
      </View>
    </View>
  )
}



export default EtalaseScreen

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
    height: height* 0.5,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 1,
  },
  fototoko:{
    width: height * 0.10,
    height: height * 0.10,
    borderRadius: 10,
    borderColor: Ijo,
    borderWidth: 2,
    marginRight: 10,
  },
  gambar:{
    width: height * 0.12,
    height: height * 0.12,
  },
  tombolproduk:{
    width: width * 0.4,
    height: height * 0.16,
    backgroundColor: Putih,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    padding: 5,
  },
  tulisanproduk:{
    fontSize: 14,
    fontWeight:'bold',
    color: IjoTua,
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
    height: height* 0.5,
  },
})