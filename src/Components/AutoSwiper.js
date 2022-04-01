import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native'
import React from 'react'
import { Header1, Header2, Header3 } from '../assets/Image/Index.js';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const AutoSwiper = () => {
  return (
    <ScrollView horizontal={true} pagingEnabled> 
        <Image source={Header1} style={styles.slider} />
        <Image source={Header2} style={styles.slider} />
        <Image source={Header3} style={styles.slider} />
        
    </ScrollView> 
  )
}

export default AutoSwiper

const styles = StyleSheet.create({
    slider: {
        height: 210,
        width: DEVICE_WIDTH
    }
})