import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'
import ProsesCard from '../Components/ProsesCard'

const ProsesScreen = () => {
  return (
    <ScrollView style={styles.latar}>
      <ProsesCard/>
      <ProsesCard/>
      <ProsesCard/>
    </ScrollView>
  )
}

export default ProsesScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  }
})