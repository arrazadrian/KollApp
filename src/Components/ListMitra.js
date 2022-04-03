import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

const ListMitra = () => {
  return (
    <View>
      <Image />
      <Text> Sayur Aa Anri </Text>
    </View>
  )
}

export default ListMitra

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 15,
    },
    foto:{
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        width: 96,
        height: 96,
    },
})