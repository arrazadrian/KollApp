import { StyleSheet, Text, View, Image, Dimensions, Pressable} from 'react-native'
import React from 'react'
import { DPkartu, Gerobak } from '../assets/Images/Index.js'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Pink, Putih } from '../Utils/Warna.js'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';


const { width, height } = Dimensions.get('window')

const ListMitra = ({ item }) => {

  const navigation = useNavigation();

  const pindahEtalase = () => {
    navigation.navigate('EtalaseScreen', { 
      id_mitra: item.id_mitra,
      namatoko: item.namatoko,
      namalengkap_mitra: item.namalengkap,
      phone: item.phone,
      foto_akun: item.foto_akun,
      geo_mangkal: item.geo,
      alamat: item.alamat,
      mangkal: item.mangkal,
      waktu_buka: item.waktu_buka,
      waktu_tutup: item.waktu_tutup,
      status_sekarang: item.status_sekarang,
    })
  }

  return (
    <Pressable style={styles.card} onPress={pindahEtalase}>
      { item.foto_akun ?
        (
        <Image source={{uri: item.foto_akun}} style={styles.foto}/>
        ):(
        <Image source={Gerobak} style={styles.foto}/>
        )
      }
      <View style={styles.deskripsi}>
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color:IjoTua}}>{item.namatoko}</Text>
            <Text style={{fontSize: 12}}>Jam Buka: {item.waktu_buka} - {item.waktu_tutup} WIB</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between',  alignItems:'center'}}>
                    { 
                    item.status_sekarang == "Tidak Aktif" ? (
                      <View style={styles.tutup}>
                        <Text style={{fontSize: 12, color: 'red'}}>Sedang Tutup</Text> 
                      </View>
                    ): item.mangkal ? 
                      (
                        <View style={styles.mangkal}>
                          <Text style={{fontSize: 12, fontWeight: 'bold', color: "#DDC238"}}>Lagi Mangkal</Text> 
                        </View>
                      ):(
                        <View style={styles.siap}>
                          <Text style={{fontSize: 12, fontWeight: 'bold', color: Ijo}}>Siap Dipanggil</Text> 
                        </View>
                      )
                    } 
                { item.rating_layanan > 3 && item.rating_produk > 3 &&
                  <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <Ionicons name="star" size={16} color="orange" />
                    <Text style={{marginRight: 10}}>{item.rating_layanan.toFixed(1)}</Text>
                    <Ionicons name="leaf" size={16} color="green" />
                    <Text style={{marginRight: 10}}>{item.rating_produk.toFixed(1)}</Text>
                  </View>
                }
            </View>
        </View>   
      </View>
    </Pressable>
  )
}

export default ListMitra

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 10,
    },
    foto:{
        width: height * 0.12,
        height: height * 0.12,
        borderRadius: 10, 
        marginRight: 10,
        flex: 1.2,
        backgroundColor:"tan",
    },
    deskripsi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 3,
    },
    mangkal:{
      backgroundColor: Kuning, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
      marginRight: 32,
    },
    siap:{
      backgroundColor: IjoMint, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
      marginRight: 32,
    },
    tutup:{
      backgroundColor: Pink, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
      marginRight: 32,
    },
})