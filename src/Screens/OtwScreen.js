import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'

const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  // const { 
  //   id_transaksi
  //    } = route.params;



  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}/>
      <View style={styles.bungkus}>
        <View style={{ flexDirection:'row', marginBottom: 10 }}>
            <Image source={DPkartu} style={styles.foto} />
            <View style={{  flex: 3}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                Sayur Aa Anri
              </Text>
              <Text style={{color: Ijo}}>Sedang menuju lokasi kamu</Text>
              <View style={{flexDirection:'row'}}>
                  <Image source={Call} style={styles.icon} />
                  <Image source={Chat} style={styles.icon} />
              </View>
            </View>
        </View>
        <View style={{marginBottom: 20}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:IjoTua}}>Tujuan Lokasi</Text>
            <Text>Jl. nuabsua sahushaus sauhauhsau usahusah sbausbau ashsua ncnsnicns csnidcnsoc acnscuodsscnu</Text>
        </View>
        <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textDecorationLine:'underline', textAlign:'center'}}
        
        >
           Batalkan Pesanan
        </Text>
      </View>
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
    },
    peta:{
        width: '100%',
        height: '70%',
    },
    bungkus:{
        backgroundColor: Kuning,
        position:'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    foto:{
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        marginRight: 10,
        flex: 1,
    },
    icon:{
        width: width * 0.1,
        height: width * 0.1,
        marginVertical: 5,
        marginRight: 20,
    },
})