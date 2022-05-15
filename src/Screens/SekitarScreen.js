import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ListMitra from '../Components/ListMitra'
import { Kuning } from '../Utils/Warna'

const SekitarScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.latar}>
      <Pressable  onPress={() => navigation.push('DalamMitra')} >
          <ListMitra/>
          <ListMitra/>
          <ListMitra/>
          <ListMitra/>
          <ListMitra/>
      </Pressable>
    </ScrollView>
  )
}

export default SekitarScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
    paddingVertical: 20,
  },
})