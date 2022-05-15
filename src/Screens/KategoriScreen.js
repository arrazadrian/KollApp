import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Kuning, Putih } from '../Utils/Warna'
import { Kategori01 } from '../assets/Image/Index'

const KategoriScreen = () => {
  return (
    <View style={styles.latar}>
      <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      </View>
      <View style={{flexDirection: 'row', alignItems:'center',}}>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      </View>
      <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      <Pressable style={styles.kartu}>
        <View style={{padding: 10, backgroundColor: Putih, borderRadius: 10, marginBottom: 10}}>
           <Image source={Kategori01} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>Produk Laut</Text>
      </Pressable>
      </View>
    </View>
  )
}

export default KategoriScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  gambar:{
    width: 80,
    height: 80,
  },
  kartu:{
    width: '33%',
    height: '100%',
    alignItems: 'center',
    margin: 10,
  },
  nama:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})