import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { IjoTua, Kuning } from '../Utils/Warna'
import FindLoc from '../Components/FindLoc'

const FLocScreen = () => {
  return (
    <ScrollView style={styles.latar}>
      <Text style={styles.judul}>Antar ke</Text>
      <FindLoc/>
    </ScrollView>
  )
}

export default FLocScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    padding: 10,
  },
  judul:{
    fontSize: 18,
    fontWeight: 'bold',
    color: IjoTua,
  }
})