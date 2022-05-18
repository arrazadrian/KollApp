import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer } from '../assets/Image/Index'

const ListProduk = () => {
  return (
    <View>
       <View style={styles.container}>
        <Image source={IkanMujaer} style={styles.gambar} />
        <Text>Rp20.000</Text> 
        <Text>Ikan Mujaer 250g</Text> 
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
        height: 190,
        width: 120,
        margin: 10,
    },
    gambar: {
        width: 100,
        height: 100,
    }
})