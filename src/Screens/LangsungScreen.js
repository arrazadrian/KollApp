import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, Kuning, Hitam, Putih } from '../Utils/Warna'
import { meetup } from '../assets/Images/Index.js'

const LangsungScreen = () => {
  return (
    <View style={styles.latar}>
      <Image source={meetup} style={styles.gambar} />
      <View style={styles.tulisan}>
          <Text style={{marginVertical: 8, color: Ijo, fontSize: 20, fontWeight: 'bold'}}>Ketemu langsung belanja!</Text>
          <Text style={{color:Hitam, fontSize: 16, textAlign:'center'}}>
            Scan QR code hasil transaksi dari mitra kami 
            untuk dapatkan struk dan poin belanja kamu.
          </Text>
      </View>
      <Pressable style={styles.tombol}>
        <Text style={{color: Putih, fontWeight:'bold', fontSize: 18, textAlign:'center'}}>Scan QR Code</Text>
      </Pressable>
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
    width: 390,
    height: 240,
    borderRadius: 20,
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tulisan:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tombol:{
    backgroundColor: Ijo,
    width: 300,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});