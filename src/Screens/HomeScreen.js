import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native'
import React from 'react'
import PencarianBar from '../Components/PencarianBar'
import { Ijo } from '../Utils/Warna';
import { LogoPutih } from '../assets/Image/Index.js';
import CarouselHome from '../Components/CarouselHome'
import { tigaGambar } from '../Data/data.js';

const HomeScreen = () => {
/* const HomeScreen = ({item}) => { */ 
  return (
    <View> 
      <View style={styles.container}>
        <Image source={LogoPutih} style={styles.logopojok} />
        <PencarianBar />
      </View>
     <CarouselHome data={tigaGambar} /> 
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: Ijo,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logopojok:{
    marginLeft: 5,
    marginTop: 15,
    width: 50,
    height: 50,
  }
})