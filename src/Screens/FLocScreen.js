import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { IjoTua, Kuning } from '../Utils/Warna'
import FindLoc from '../Components/FindLoc'
import MapView from 'react-native-maps'

const FLocScreen = () => {
  return (
    <View style={styles.latar}>
      <Text style={styles.judul}>Antar ke</Text>
      <View>
        <FindLoc/>
      </View>
      <MapView style={styles.peta}/>
    </View>
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
  },
  peta:{
    width: '100%',
    height: '70%',
    marginTop: 10,
  },
})