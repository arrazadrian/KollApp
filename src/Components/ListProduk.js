import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

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
    })
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={pindahDetail}>
        <View>
          <Image source={{uri: item.image}} style={styles.gambar} />
        </View>
        <View style={{paddingLeft:5}}>
          <Text 
          style={{fontSize:18, fontWeight:'bold'}}
          numberOfLines={1}
          >Rp{item.harga}</Text> 
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
      height: height * 0.28,
      width: width * 0.3,
      marginBottom: 10,
    },
    gambar: {
      width:  height * 0.13,
      height: height * 0.13,
      borderRadius: 10,
      alignSelf: 'center',
      resizeMode: 'cover',
      marginBottom: 10,
    }
})