import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { DPkartu } from '../assets/Image/Index.js'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PosisiScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <View style={{height:'70%'}}>
            <Text>Peta</Text>
      </View>
      <View style={styles.kotak}>
            <View style={{flexDirection:'row'}}>
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
                  <Pressable style={styles.tombol} onPress={() => navigation.push('KategoriScreen')}>
                    <Text style={{color: Putih, fontWeight: 'bold'}}>Lihat Produk</Text>
                  </Pressable>
                </View>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height:'30%',
    padding: 20,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 20,
  },
  tombol:{
    backgroundColor: Ijo,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  }
})