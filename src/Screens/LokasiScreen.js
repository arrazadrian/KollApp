import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu, Location } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get('window')

const LokasiScreen = ({ route }) => {

    const navigation = useNavigation();

    const { 
        namatoko, foto_akun,
         } = route.params;

    const { alamat, geo } = useSelector(state => state.posisi);
    const { namapelanggan } = useSelector(state => state.pelanggan);


  return (
    <View>
       <MapView style={styles.peta} 
            initialRegion={{
              latitude: geo.lat,
              longitude:  geo.lng,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
          }}
          >
          <Marker 
            coordinate={{
              latitude: geo.lat,
              longitude: geo.lng
            }}
            title={namapelanggan}
            description="Lokasi Kamu"
            pinColor={'tan'}
            identifier="pelanggan"
          />
          </MapView>
        <View style={styles.bungkus}>
                <View style={styles.atas}>
                    <View>
                        <Image source={{uri: foto_akun}} style={styles.foto}/>
                    </View> 
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>{namatoko}</Text>
                        <Text style={{fontSize: 12, fontStyle:'italic', width:'80%'}}>
                            Mitra akan sampai di lokasi kamu paling lambat 40 menit
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: IjoTua}}>Tujuan Lokasi</Text>
                        <Text style={{fontSize: 16, fontWeight:'bold', color: Ijo, textDecorationLine:'underline'}}
                        onPress={() => navigation.navigate('FLocScreen')}
                        >Ubah</Text>
                    </View>
                    <Pressable style={{marginVertical:5, flexDirection:'row', alignItems:'center', width: width * 0.8}}
                      onPress={() => navigation.navigate('FLocScreen')}
                    >
                        <Image source={Location} style={styles.location} />
                        <Text style={styles.deskripsi} numberOfLines={2}>{alamat}</Text>
                    </Pressable>
                </View>
                <View style={{marginBottom: 10}}>
                    <TextInput placeholder='Beri catatan lokasi...' style={styles.input}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.batal}
                         onPress={() => navigation.goBack()}
                    >
                            Batal
                    </Text>
                    <Pressable style={styles.panggil}
                        onPress={() => navigation.navigate('LoadingScreen')}
                        >
                        <Text style={{fontSize: 18, color:Putih, fontWeight:'bold'}}>Panggil</Text>
                    </Pressable>     
                </View>
        </View>
    </View>
  )
}

export default LokasiScreen

const styles = StyleSheet.create({
    peta:{
        width: width,
        height: height * 0.6,
      },
    bungkus:{
        width: width,
        height: height * 0.5,
        backgroundColor: Kuning,
        padding: 20,
    },
    foto:{
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: Putih,
        borderRadius: 10,
        marginRight: 10,
    },
    atas:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    location:{
        width:20,
        height:20,
        marginRight:5,
      },
    input:{
        backgroundColor: Abu,
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    panggil:{
        flex: 1,
        backgroundColor: Ijo,
        borderRadius: 10,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    batal:{
        flex: 1,
        fontSize: 18,
        textAlign:'center',
        color: Ijo,
        fontWeight:'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    deskripsi:{
        fontSize: 16,
        color: Ijo,
    },
})