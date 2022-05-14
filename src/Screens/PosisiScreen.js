import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu } from '../assets/Image/Index.js'
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
          <View style={{paddingHorizontal:20}}>
            <Text style={{color: Putih, fontSize:20, fontWeight: 'bold'}}>Sayur Aa Anri</Text>
            <Text style={{color: Putih, fontSize:16}}>
                <Text>200m</Text>
                <Text> | </Text>
                <Text>20 min</Text>
            </Text>
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
    flexDirection: 'row',
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
    padding: 20,
  },
})