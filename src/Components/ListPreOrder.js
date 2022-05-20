import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer } from '../assets/Image/Index'
import { Plus, Minus } from '../assets/Icon/Index.js'

const ListProduk = () => {
  return (
    <View>
       <View style={styles.container}>
          <Image source={IkanMujaer} style={styles.gambar} />
          <Text style={{fontSize:18, fontWeight:'bold'}}>Rp25.000</Text> 
          <View style={{marginBottom: 10}}>
              <Text>Ikan Mujaer</Text> 
              <Text>250g</Text> 
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
            <Plus/>
              <Text style={{fontSize: 20}}>0</Text>
            <Minus/>
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
        height: 210,
        width: 120,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    gambar: {
        width: 90,
        height: 90,
    }
})