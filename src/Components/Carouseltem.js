import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Header1, Header2, Header3 } from '../assets/Image/Index.js'

const {width, height} = Dimensions.get('window')

const Carouseltem = ({item}) => {
  return (
    <View style={ styles.container }>
      <Image style={ styles.gambar } source ={item.image} />
    
    </View>
  )
}

export default Carouseltem

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: width,
        height: 150,
    },
    gambar:{
        width: width,
        height: 150
    }

})