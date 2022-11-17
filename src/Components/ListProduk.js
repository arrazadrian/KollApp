import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'
import "intl"
import "intl/locale-data/jsonp/id"

const { height, width } = Dimensions.get('window')

const ListProduk = ({item}) => {
  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
      tersedia: item.tersedia,
    })
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={pindahDetail}>
        { item.tersedia ? 
        (
        <View>
          <Image source={{uri: item.image}} style={styles.gambar} />
        </View>
        ):(
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image source={{uri: item.image}} style={styles.gambarhabis} />
          <Text style={styles.habis}>Stok Habis</Text>
        </View>
        )
        }
        <View style={{paddingLeft:5}}>
          <Text 
          style={{fontSize:18, fontWeight:'bold'}}
          numberOfLines={1}
          >Rp{new Intl.NumberFormat('id-Id').format(item.harga).toString()}</Text> 
          <Text
          style={{fontSize:16}}
          numberOfLines={1}
          >{item.namaproduk}</Text> 
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
      height: height * 0.27,
      width: width * 0.3,
      marginBottom: 10,
    },
    gambar: {
      width:  height * 0.13,
      height: height * 0.13,
      borderRadius: 10,
      alignSelf: 'center',
      resizeMode: 'cover',
      marginBottom: 5,
    },
    gambarhabis: {
      width:  height * 0.13,
      height: height * 0.13,
      borderRadius: 10,
      alignSelf: 'center',
      resizeMode: 'cover',
      marginBottom: 5,
      opacity: 0.3,
    },
    habis:{
      position:'absolute',
      fontSize: 14,
      fontWeight:'bold',
      color:'tomato',
    },
})