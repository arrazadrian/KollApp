import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'

const { width, height } = Dimensions.get('window')

const VoucherAktif = () => {
  return (
    <View style={styles.card}>
        <View style={styles.bagharga}>
            <Text style={{color: Ijo}}>Besar Potongan</Text>
            <Text style={styles.harga}>Rp10.000</Text>
        </View>
        <View style={styles.bagmin}>
            <View style={{marginTop: 10}}>
                <Text style={styles.hargamin}>Minimal belanja</Text>
                <Text style={styles.deskripsi}>Rp30000</Text>
            </View>
            <Pressable style={styles.tombol}>
                <Text style={{color:Putih, fontWeight:'bold'}}>Pakai</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default VoucherAktif

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        borderColor: Ijo,
        borderWidth: 1,
        marginHorizontal: 10,
        marginBottom: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection:'row',
        height: height * 0.15,
        alignItems:'center',
        marginVertical: 5,
    },
    harga:{
        fontSize: 30,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
    },
    deskripsi:{
        color: IjoTua,
        textAlign:'center',
    },
    bagharga:{
        flex: 4,
        padding: 10,
    },
    bagmin:{
        flex: 2,
        backgroundColor: IjoMint,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent:'center',
        alignItems:'center',
    },
    hargamin:{
        fontSize: 12,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
        textAlign:'center',
    },
    tombol:{
        backgroundColor: Ijo,
        borderRadius: 5,
        padding: 5,
        alignItems:'center',
        width: '60%',
        marginBottom: 10,
        marginTop: 8,
    }
})