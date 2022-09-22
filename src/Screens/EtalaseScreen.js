import { StyleSheet, Text, View, Image, Pressable, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { Gerobak, KategoriPre } from '../assets/Images/Index.js'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import GarisBatas from '../Components/GarisBatas';

const { height, width } = Dimensions.get('window')

const EtalaseScreen = ({ route }) => {

  const navigation = useNavigation();

  const { 
    namalengkap, namatoko, foto_akun, tempat_mangkal, mangkal, id_mitra, waktu_buka, waktu_tutup, status_sekarang,
     } = route.params;

  const pindahUtama = () => {
    navigation.navigate('ProdukScreen', { 
      id_mitra: id_mitra,
      status_sekarang: status_sekarang,
    })
  }

  const pindahPreorder = () => {
    navigation.navigate('PreorderScreen', { 
      id_mitra: id_mitra,
      status_sekarang: status_sekarang,
    })
  }

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
              description="Lokasi mangkal"
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
                  <Text style={{color: Putih, fontSize:14}}>Dikelola oleh {namalengkap}</Text>
                  <Text style={{color: Putih, fontSize:12}}>Waktu Operasional: {waktu_buka} - {waktu_tutup}</Text>
              </View>
          </View>
          <GarisBatas/>
          <Text style={{color: Putih, fontSize:18, fontWeight: 'bold', marginBottom: 10}}>Produk Mitra</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 10}}>
              <TouchableOpacity style={styles.tombolproduk}
                onPress={pindahUtama}>
                    <Image source={Gerobak} style={styles.gambar}/>
                    <Text style={styles.tulisanproduk}>Produk Utama</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tombolproduk}
                onPress={pindahPreorder}>
                    <Image source={KategoriPre} style={styles.gambar}/>
                    <Text style={styles.tulisanproduk}>Produk Pre-Order</Text>
              </TouchableOpacity>
          </View>
          { status_sekarang == "Tidak Aktif" ?(
              <View style={{ borderColor:Ijo, borderWidth: 0.5, borderRadius: 10, padding: 10, width:'100%', alignSelf:'center', alignItems:'center'}}>
                  <Text style={{color: Ijo, fontStyle:'italic', fontSize: 16, textAlign:'center'}}>Maaf, mitra sedang tidak berjualan</Text>
              </View> 
          ): mangkal ? (
              <View style={{ borderColor:Ijo, borderWidth: 0.5, borderRadius: 10, padding: 10, width:'100%', alignSelf:'center', alignItems:'center'}}>
                  <Text style={{color: Ijo, fontStyle:'italic', fontSize: 16, textAlign:'center'}}>Maaf, mitra yang mangkal tidak bisa dipanggil</Text>
              </View> 
            ):(
              <Pressable style={styles.tombolpanggil} onPress={()=> navigation.goBack()}>
                  <Text style={{color: Putih, fontWeight: 'bold',  fontSize: 16}}>Panggil Mitra</Text>
              </Pressable> 
            )
          }
      </View>
      <View style={styles.lokmang}>
            <Text style={{color: Ijo, fontSize:12, textAlign:'center'}}>Lokasi Mangkal</Text>
            <Text style={{color: Ijo, fontSize:14, fontWeight: 'bold', textAlign:'center'}}>Jl. Cepat Lulus</Text>
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
    width: width * 0.43,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    padding: 10,
  },
  tulisanproduk:{
    fontSize: 14,
    fontWeight:'bold',
    color: Putih,
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
  lokmang:{
    position: 'absolute',
    alignSelf: 'center',
    top: height* 0.02,
    width: '80%',
    backgroundColor: Putih,
    padding: 10,
    borderColor: Ijo,
    borderWidth: 1,
    borderRadius: 10,
  },
})