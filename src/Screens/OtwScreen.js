import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Kuning } from '../Utils/Warna'
import { DPkartu } from '../assets/Image/Index'

const OtwScreen = () => {
  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}/>
      <View style={styles.bungkus}>
          <Image source={DPkartu} style={styles.foto} />
      </View>
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    peta:{
        width: '100%',
        height: '75%',
    },
    bungkus:{
        width: '100%',
        height: '25%',
        padding: 10,
    },
    foto:{
        width: 100,
        height: 100,
        borderRadius: 20,
    },
})