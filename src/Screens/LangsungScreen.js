import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Kuning } from '../Utils/Warna'

const LangsungScreen = () => {
  return (
    <View style={styles.latar}>
      <Text>LangsungScreen</Text>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
});