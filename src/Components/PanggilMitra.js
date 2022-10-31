import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const PanggilMitra = (props) => {
  const navigation = useNavigation(); 

  const pindahLokasi = () => {
    navigation.navigate('LokasiScreen', { 
      id_mitra: props.id_mitra,
      namalengkap_mitra: props.namalengkap_mitra,
      namatoko: props.namatoko,
      phonemitra: props.phonemitra,
      geo_mangkal: props.geo_mangkal,
    })
  }

  return (
    <View style={styles.panggil}>
        <View style={{width: '70%', flex: 2}}>
            <Text style={{fontWeight:'bold', color: Ijo, fontSize: 13}}>Menemukan produk yang kamu mau? Yuk panggil mitra!</Text>
        </View>
        <Pressable style={{padding: 10, backgroundColor: Ijo, borderRadius: 8, flex: 1, marginLeft: 5}} onPress={pindahLokasi}>
            <Text style={{fontWeight:'bold', color:Putih, textAlign:'center'}}>Panggil Mitra</Text>
        </Pressable>
    </View>
  )
}

export default PanggilMitra

const styles = StyleSheet.create({
    panggil:{
        flexDirection: 'row',
        backgroundColor: IjoMint,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        borderColor: Ijo,
        borderWidth: 3,
        bottom: 20,
        width:'90%',
      },
})