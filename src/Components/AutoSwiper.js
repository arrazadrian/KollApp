import { StyleSheet, Text, View, ScrollView, Image, Dimensions} from 'react-native'
import React from 'react'
import { Header1, Header2, Header3 } from '../assets/Image/Index.js';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


function pageScroll() {
  window.scrollBy(0,1);
  scrolldelay = setTimeout(pageScroll,10);
}
 

const AutoSwiper = () => {
  return (
    <ScrollView 
    horizontal={true} 
    pagingEnabled 
    showsHorizontalScrollIndicator={false}
    pageScroll={pageScroll}
    > 
        <Image source={Header1} style={styles.slider} />
        <Image source={Header2} style={styles.slider} />
        <Image source={Header3} style={styles.slider} />
        
    </ScrollView> 
  )
}

export default AutoSwiper

const styles = StyleSheet.create({
    slider: {
        height: 140,
        width: DEVICE_WIDTH
    }
})