import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, Kuning, Hitam, Putih } from '../Utils/Warna'
import { meetup } from '../assets/Images/Index.js'

const { height, width } = Dimensions.get('window')

const LangsungScreen = () => {
  return (
    <View style={styles.latar}>
      <Image source={meetup} style={styles.gambar} />
      <View style={styles.tulisan}>
          <Text style={{marginTop: 8, color: Ijo, fontSize: 20, fontWeight: 'bold', textAlign:'center'}}>Ketemu langsung belanja!</Text>
          <Text style={{color:Hitam, fontSize: 16, textAlign:'center'}}>
            Scan QR code hasil transaksi dari mitra kami 
            untuk dapatkan struk dan poin belanja kamu.
          </Text>
      </View>
      <TouchableOpacity style={styles.tombol}>
        <Text style={{color: Putih, fontWeight:'bold', fontSize: 18, textAlign:'center'}}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
    justifyContent:'center',
  },
  gambar:{
    width: width * 0.8,
    height: height * 0.28,
    borderRadius: 20,
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tulisan:{
    alignSelf:'center',
    marginBottom: 20,
    width: width * 0.8,
  },
  tombol:{
    backgroundColor: Ijo,
    width: width * 0.8,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});