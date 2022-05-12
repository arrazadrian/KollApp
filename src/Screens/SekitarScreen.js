import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListMitra from '../Components/ListMitra'
import { Kuning } from '../Utils/Warna'

const SekitarScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <Pressable  onPress={() => navigation.push('DalamMitra')} >
          <ListMitra/>
      </Pressable>
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