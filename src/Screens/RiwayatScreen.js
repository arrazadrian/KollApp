import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import HeaderTabs from '../Components/HeaderTabs'

const RiwayatScreen = () => {
  return (
   
      <View style={styles.container}>
        <View style={styles.bungkus}>
          <HeaderTabs/>
        </View>
      </View>
    
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ijo,
    paddingTop: 30,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bungkus: {
    backgroundColor: Putih,
    borderRadius: 10,
    height: 40,
    paddingVertical: 5, 
  }
})