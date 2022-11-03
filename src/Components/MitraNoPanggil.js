import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'

const MitraNoPanggil = () => {
  return (
    <View style={styles.tutup}>
        <View style={{width: '70%', flex: 2}}>
            <Text style={{fontWeight:'bold', color: Putih, fontSize: 16, textAlign:'center'}}>Maaf, mitra sedang tidak bisa dipanggil</Text>
        </View>
    </View>
  )
}

export default MitraNoPanggil

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