import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const ProsesScreen = () => {
  return (
    <ScrollView style={styles.latar}>
      <Text>ProsesScreen</Text>
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