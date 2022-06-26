import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer } from '../assets/Images/Index'
import QuantitySelector from '../Components/QuantitySelector'
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
  
  const [quantity,setQuantity]= useState(0)

  return (
    <View>
       <View style={styles.container}>
          <Pressable onPress={pindahDetail}>
              <Image source={item.image} style={styles.gambar} />
          </Pressable>
          <View style={{paddingLeft:5}}>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{item.harga}</Text> 
              <View style={{marginBottom: 5}}>
                  <Text
                  numberOfLines={1}
                  style={{fontSize:16}}
                  >{item.nama}</Text> 
                  <Text>{item.kuantitas}{item.satuan}</Text> 
              </View>
          </View>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
        </View> 
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
        height: 210,
        width: 120,
        marginLeft: 13,
        marginBottom: 10,
    },
    gambar: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 90,
        height: 90,
    }
})