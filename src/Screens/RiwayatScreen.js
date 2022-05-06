import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Ijo } from '../Utils/Warna'

const RiwayatScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>RiwayatScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Ijo,
  }
})