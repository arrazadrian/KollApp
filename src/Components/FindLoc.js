import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const FindLoc = () => {
  return (
    <View style={styles.bungkus}>
      <GooglePlacesAutocomplete
      query={{key:"AIzaSyAe0RD2Jx2czBoHpLZe-9WZQ6XlgdEoDJE"}}
      placeholder='Cari Lokasi'
      />
    </View>
  )
}

export default FindLoc

const styles = StyleSheet.create({
    bungkus:{
        marginTop: 5,
        flexDirection:'row',
        width: '100%',
    },
})