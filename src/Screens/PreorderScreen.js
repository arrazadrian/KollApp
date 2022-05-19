import {StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna'

const PreorderScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ScrollView style={styles.latar}>
        <View style={styles.bungkus}>
            <Text style={styles.judulisi}>Nama Produk</Text>
            <TextInput style={styles.input} placeholder="Halo"/>
            <Text style={styles.judulisi}>Deskripsi Produk</Text>
            <TextInput style={styles.input} placeholder="Halo" multiline={true}/>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <Text style={styles.judulisi}>Kuantitas Produk</Text>
              <TextInput style={styles.input} placeholder="Halo" keyboardType='numeric'/>
              </View>
              <View>
              <Text style={styles.judulisi}>Satuan Produk</Text>
              <TextInput style={styles.input} placeholder="Halo"/>
              </View>
            </View>
            <Text style={styles.judulisi}>Alamat Tujuan</Text>  
            <TextInput style={styles.input} placeholder="Halo"/>
            <Text style={{textAlign:'center'}}>
              Pre-Order yang dilakukan setelah pukul 18.00 WIB akan 
              dikirim lusa. Sementara Pre-Order yang dipesan sebelum 
              waktu tersebut akan dikirim keesokan harinya.
            </Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default PreorderScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  bungkus:{
    backgroundColor: IjoMint,
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  input:{
    backgroundColor: Putih,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    flexWrap: 'wrap',
  },
  judulisi:{
    fontSize: 16,
    color: IjoTua,
  },
})