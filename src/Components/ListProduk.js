import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer } from '../assets/Image/Index'

const ListProduk = () => {
  return (
    <View>
       <View style={styles.container}>
        <View>
          <Image source={IkanMujaer} style={styles.gambar} />
        </View>
        <View>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Rp25.000</Text> 
          <Text>Ikan Mujaer</Text> 
          <Text>250g</Text> 
        </View>
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
        height: 180,
        width: 120,
        marginHorizontal: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    gambar: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
    }
})