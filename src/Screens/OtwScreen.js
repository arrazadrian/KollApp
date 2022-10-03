import { Image, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'
import { Tiba, Perjalanan, Load1, Load2, Load3 } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';


const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  // const { 
  //   id_transaksi
  //    } = route.params;



  return (
    <View style={styles.latar}>
      <View>
        <Image source={Perjalanan} style={styles.gambar}/>
        <Image source={Load1} style={styles.load}/>
        <Text style={styles.tulisan}>Mitra sedang menuju lokasi kamu</Text>
      </View>

      <View style={styles.bungkus}>
        <View style={{ flexDirection:'row', marginBottom: 10, justifyContent:'space-between', alignItems:'center' }}>
            <View style={{flex: 6}}>
              <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}} numberOfLines={1}>
                Sayur Segar Dramga
              </Text>
              <View style={{flexDirection:'row'}}>
                  <Image source={Call} style={styles.icon} />
                  <Image source={Chat} style={styles.icon} />
              </View>
            </View>
            <Image source={DPkartu} style={styles.foto} />
        </View>
        <GarisBatas/>
        <View style={{marginBottom: 20}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:IjoTua}}>Tujuan Lokasi</Text>
            <Text numberOfLines={3}>Jl. nuabsua sahushaus sauhauhsau usahusah sbausbau ashsua ncnsnicns csnidcnsoc acnscuodsscnu</Text>
        </View>
        <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textDecorationLine:'underline', textAlign:'center'}}
        
        >
           Batalkan Pesanan
        </Text>
      </View>
      <Pressable style={styles.kembali} onPress={()=> navigation.navigate('HomeScreen')}>
            <Ionicons name="chevron-back-circle-outline" size={40} color={Putih} />
        </Pressable>
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: IjoTua,
    },
    bungkus:{
        backgroundColor: Kuning,
        position:'absolute',
        bottom: 0,
        width: width,
        height: height * 0.35,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    foto:{
        flex: 2,
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
        marginLeft: 20,
    },
    icon:{
        width: width * 0.10,
        height: width * 0.10,
        marginVertical: 5,
        marginRight: 20,
    },
    gambar:{
      width: width * 0.9,
      height: height * 0.28,
      alignSelf:'center',
      marginBottom: 20,
      marginTop: height * 0.17,
      borderRadius: 10,
    },
    load:{
      width: width * 0.6,
      height: height * 0.1,
      alignSelf:'center',
      marginBottom: 10,
      borderRadius: 10,
    },
    tulisan:{
      color: Putih,
      textAlign:'center',
      fontSize: 16,
    },
    kembali:{
      borderRadius: 20,
      position:'absolute',
      top: height * 0.08,
      left: width * 0.05,
      justifyContent:'center',
      alignItems:'center',
    },
})