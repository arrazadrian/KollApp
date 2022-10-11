import { StyleSheet, Text, View, Image, Dimensions, Pressable} from 'react-native'
import React from 'react'
import { DPkartu } from '../assets/Images/Index.js'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Pink, Putih } from '../Utils/Warna.js'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const ListMitra = ({ item }) => {

  const navigation = useNavigation();

  const pindahEtalase = () => {
    navigation.navigate('EtalaseScreen', { 
      id_mitra: item.id,
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
      <Image source={{uri: item.foto_akun}} style={styles.foto}/>
      <View style={styles.deskripsi}>
        <View >
            <Text style={{fontSize: 20, fontWeight: 'bold', color:IjoTua}}>{item.namatoko}</Text>
            <Text style={{fontSize: 12}}>Jam Buka: {item.waktu_buka} - {item.waktu_tutup} WIB</Text>
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
    },
    deskripsi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mangkal:{
      backgroundColor: Kuning, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
    },
    siap:{
      backgroundColor: IjoMint, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
    },
    tutup:{
      backgroundColor: Pink, 
      borderRadius: 5,
      marginTop: 5,
      width: 100,
      padding: 5, 
      alignItems:'center',
    },
})