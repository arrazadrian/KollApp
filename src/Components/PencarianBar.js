import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

const PencarianBar = () => {
  return (
    <View style={{marginTop: 20}}>
      <TextInput placeholder='Cari produk yang anda inginkan' style={styles.container}> 
        
      </TextInput>
    </View>
  )
}

export default PencarianBar

const styles = StyleSheet.create({
  container:{
    height: 40,
    width: 290,
    backgroundColor: '#fff',
    fontSize: 15,
    borderRadius: 10,
    paddingLeft:10,
    paddingRight: 10,
    paddingStart: 30,
    paddingEnd: 10,
    marginLeft: 10,
    marginRight: 20

  }
})