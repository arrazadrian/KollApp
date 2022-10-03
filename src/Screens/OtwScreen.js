import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat, Sampai, LagiJalan } from '../assets/Icons/Index'
import GarisBatas from '../Components/GarisBatas';


const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  // const { 
  //   id_transaksi
  //    } = route.params;



  return (
    <View style={styles.latar}>
          <View>
            <Image source={Sampai} style={styles.gambar}/>
            <Text style={styles.tulisan}>Mitra sedang menuju lokasi kamu</Text>
          </View>
      {/* { panggilan == "Diterima" ?
        (
          <View>
            <Image source={LagiJalan} style={styles.gambar}/>
            <Text style={styles.tulisan}>Mitra sedang menuju lokasi kamu</Text>
          </View>
        ):(
          <View>
            <Image source={Sampai} style={styles.gambar}/>
            <Text style={styles.tulisan}>Mitra sudah sampai loh, selamat berbelanja!</Text>
          </View>
        )
      } */}

      <View style={styles.bungkus}>
        <View style={{ flexDirection:'row', marginBottom: 10, justifyContent:'space-between', alignItems:'center' }}>
            <View>
              <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}}>
                Sayur Aa Anri
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
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
    },
    icon:{
        width: width * 0.10,
        height: width * 0.10,
        marginVertical: 5,
        marginRight: 20,
    },
    gambar:{
      width: width * 0.7,
      height: height * 0.5,
      borderRadius: 20,
    },
    tulisan:{
      color: Putih,
      textAlign:'center',
      fontSize: 16,
    }
})