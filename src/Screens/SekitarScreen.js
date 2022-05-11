import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListMitra from '../Components/ListMitra'
import { Kuning } from '../Utils/Warna'

const SekitarScreen = () => {
  return (
    <View style={styles.latar}>
      <ListMitra/>
    </View>
  )
}

export default SekitarScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
})