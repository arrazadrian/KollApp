import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const ListProduk = ({item}) => {

  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      nama: item.nama,
      deskripsi: item.deskripsi,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
    })
  }

  return (
    <View style={styles.container}>
        <Pressable
            onPress={pindahDetail}>
            <View>
              <Image source={item.image} style={styles.gambar} />
            </View>
            <View style={{paddingLeft:5}}>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{item.harga}</Text> 
              <Text
              style={{fontSize:16}}
              numberOfLines={1}
              >{item.nama}</Text> 
              <Text>{item.kuantitas}{item.satuan}</Text> 
            </View>
       </Pressable>
          </View> 
  )
}

export default ListProduk

const styles = StyleSheet.create({
    container: {
        backgroundColor: Putih,
        borderRadius: 10,
        borderColor: Ijo,
        borderWidth: 1,
        padding: 10,
        height: 190,
        width: 120,
        marginLeft: 13,
        marginBottom: 10,
    },
    gambar: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf:'center',
    }
})