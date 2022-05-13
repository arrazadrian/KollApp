import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu } from '../assets/Image/Index.js'

const PosisiScreen = () => {
  return (
    <View style={styles.latar}>
      <View>
          <Text>Peta</Text>
      </View>
      <View style={styles.kotak}>
          <View>
            <Image source={DPkartu} style={styles.gambar}/>
          </View>
          <View>
            <Text>Sayur Aa Anri</Text>
          </View>

      </View>
    </View>
  )
}



export default PosisiScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  kotak:{
    backgroundColor: IjoTua,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height:'50%',
    top:250,
    padding: 20,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})