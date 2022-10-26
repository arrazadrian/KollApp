import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, Putih } from '../Utils/Warna'

const { width, height } = Dimensions.get('window')

const VoucherAktif = () => {
  return (
    <View style={styles.card}>
        <View style={styles.bagharga}>
            <Text>Besar Potongan</Text>
            <Text style={styles.harga}>Rp10.000</Text>
            <Pressable style={styles.tombol}>
                <Text>Pakai</Text>
            </Pressable>
        </View>
        <View style={styles.bagmin}>
            <Text style={styles.hargamin}>Minimal belanja</Text>
            <Text>Rp7000</Text>
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
        height: height * 0.14,
        alignItems:'center',
    },
    harga:{
        fontSize: 30,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
    },
    bagharga:{
        flex: 3,
        padding: 10,
    },
    bagmin:{
        flex: 2,
        backgroundColor: IjoMint,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    hargamin:{
        fontSize: 12,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
    },
    tombol:{
        borderWidth: 2,
        borderColor: Ijo,
        borderRadius: 10,
        padding: 5,
        alignItems:'center',
        width: '50%',
    }
})