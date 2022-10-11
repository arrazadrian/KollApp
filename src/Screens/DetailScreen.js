import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { IkanMujaer } from '../assets/Images/Index'
import { Ijo, IjoMint, IjoTua, Kuning, Pink } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const DetailScreen = ({ navigation, route }) => {

  const { namaproduk, deskproduk, image, harga, satuan, kuantitas, tersedia } = route.params;

  return (
    <View style={styles.latar}>
      {tersedia ? 
      (
      <View>
        <Image source={{ uri: image}} style={styles.gambar}/>
      </View>
      ):(
      <View style={{alignItems:'center'}}>
        <Image source={{ uri: image}} style={styles.gambar}/>
        <View style={styles.bungkushabis}>
           <Text style={styles.habis}>Stok Habis</Text>
        </View>
      </View>
      )}
      <View style={{paddingHorizontal: width * 0.1}}>
        <Text style={styles.subjudul}>{namaproduk}</Text>
        <Text style={styles.deskripsi}>{deskproduk}</Text>
        <Text style={{fontSize:20, color:IjoTua, fontWeight:'bold'}}>Rp{harga} | {kuantitas}{satuan}</Text>     
      </View>
      <Pressable style={styles.tombol}
        onPress={() => navigation.goBack()}>
            <Text style={styles.tomboltext}>Kembali</Text>
      </Pressable>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        justifyContent:'center',
    },
    gambar:{
        height: width * 0.8,
        width: width * 0.8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Ijo,
        marginBottom: 10,
        alignSelf:'center'
    },
    subjudul:{
        fontSize: 26,
        color: Ijo,
        fontWeight:'bold',
    },
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
        textAlign:'justify',
    },
    tombol:{
        position:'absolute',
        fontSize: 20,
        backgroundColor: IjoMint,
        borderRadius: 20,
        bottom: 30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        height: 50,
        width: width * 0.8,
    },
    tomboltext:{
        color: Ijo,
        fontWeight:'bold',
        fontSize: 20,
    },
    bungkushabis:{
        position:'absolute',
        padding: 8,
        backgroundColor: Pink,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: width * 0.5,
    },
    habis:{
        fontSize:16,
        fontWeight:'bold',
        color:'tomato',
        textAlign:'center',
    },
})