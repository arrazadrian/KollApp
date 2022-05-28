import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Image/Index'
import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('window')

const LokasiScreen = () => {
  return (
    <ScrollView>
        <View>
            <MapView style={styles.peta}/>
        </View>
        <View style={styles.bungkus}>
                <View style={styles.atas}>
                    <View>
                        <Image source={DPkartu} style={styles.foto}/>
                    </View> 
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>Sayur Aa Anri</Text>
                        <Text>
                            <Text>200m</Text>
                            <Text> | </Text>
                            <Text>20 menit</Text>
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight:'bold'}}>Tujuan Lokasi</Text>
                    <Text style={{fontSize: 18, fontWeight:'bold', color: Ijo}}>Ubah</Text>
                    </View>
                    <Text style={{fontSize: 18, flexWrap:'wrap'}}>Jl. Menuju Skripsi No 1</Text>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 18, fontWeight:'bold'}}>Beri catatan</Text>
                    <TextInput placeholder='Deskripsikan lokasi...' multiline={true} style={styles.input}/>
                </View>
                <Pressable style={styles.panggil}>
                    <Text style={{fontSize: 20, color:Ijo, fontWeight:'bold'}}>Panggil</Text>
                </Pressable>
            
        </View>
        
    </ScrollView>
  )
}

export default LokasiScreen

const styles = StyleSheet.create({
    peta:{
        width: '100%',
        height: height*(1/3),
      },
    bungkus:{
        width: '100%',
        height: height*(2/3),
        backgroundColor: IjoMint,
        padding: 20,
    },
    foto:{
        width: 100,
        height: 100,
        backgroundColor: Putih,
        borderRadius: 20,
        marginRight: 10,
    },
    atas:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input:{
        backgroundColor: Putih,
        fontSize: 18,
        borderRadius: 10,
        flexWrap: 'wrap',
        padding: 10,
    },
    panggil:{
        borderColor: Ijo,
        borderWidth: 3,
        borderRadius: 20,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    }
})