import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Ijo, Kuning, Putih } from '../Utils/Warna'
import HeaderTabs from '../Components/HeaderTabs'
import ProsesCard from '../Components/ProsesCard'
import RiwayatCard from '../Components/RiwayatCard'

const RiwayatScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.latar}>
      <View style={styles.container}>
        <View style={styles.bungkus}>
          <HeaderTabs/>
        </View>
      </View>
      <ProsesCard/>
      <RiwayatCard/>
    </ScrollView>
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
  },
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
})