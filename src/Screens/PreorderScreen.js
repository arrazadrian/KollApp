import {StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'

const PreorderScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <Text>Pre-Order yang dilakukan setelah pukul 18.00 WIB akan dikirim lusa. Sementara Pre-Order yang dipesan sebelum waktu tersebut akan dikirim keesokan harinya.</Text>
      <Text>Nama Produk</Text>
      <Text>Kuantitas Produk</Text>
      <Text>Satuan Produk</Text>
      <Text>Kuantitas Produk</Text>
      <Text>Deskripsi Produk</Text>
      <Text>Alamat Tujuan</Text>  
    </View>
  )
}

export default PreorderScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  }
})