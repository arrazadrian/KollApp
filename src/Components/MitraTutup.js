import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'


const MitraTutup = () => {
  return (
    <View style={styles.tutup}>
        <View style={{width: '70%', flex: 2}}>
            <Text style={{fontWeight:'bold', color: Putih, fontSize: 16, textAlign:'center'}}>Maaf, mitra sedang tidak berjualan</Text>
        </View>
    </View>
  )
}

export default MitraTutup

const styles = StyleSheet.create({
    tutup:{
        flexDirection: 'row',
        backgroundColor: IjoTua,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        borderColor: Ijo,
        borderWidth: 1,
        bottom: 20,
        width:'90%',
      },
})