import { StyleSheet, Text, View, Image,  TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu, Location } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import GarisBatas from '../Components/GarisBatas';
import { buatTransaksiPM } from '../../API/firebasemethod';

const { height, width } = Dimensions.get('window')

const LokasiScreen = ({ route }) => {

    const navigation = useNavigation();

    const { 
        namatoko, foto_akun, id_mitra, namalengkap_mitra, phone
         } = route.params;

    const { alamat, geo } = useSelector(state => state.posisi);
    const { namapelanggan, phonepelanggan } = useSelector(state => state.pelanggan);
    const [catatan, setCatatan] = useState("");

    const handlePanggil = () => {
        buatTransaksiPM(
            alamat, 
            geo, 
            catatan,
            id_mitra,
            namalengkap_mitra, 
            namatoko,
            phone,
            namapelanggan,
            phonepelanggan,
            );
        navigation.navigate('LoadingScreen');
    };


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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: IjoTua}}>Pastikan lokasi kamu benar</Text>
                        {/* <Text style={{fontSize: 16, fontWeight:'bold', color: Ijo, textDecorationLine:'underline'}}
                        onPress={() => navigation.navigate('FLocScreen')}
                        >Ubah</Text> */}
                    </View>
                    <View style={{marginVertical:5, flexDirection:'row', alignItems:'center', width: width * 0.8}}>
                        <Image source={Location} style={styles.location} />
                        <Text style={styles.deskripsi} numberOfLines={2}>{alamat}</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <TextInput 
                        placeholder='Beri catatan lokasi...' 
                        style={styles.input}
                        multiline={true}
                        value={catatan}
                        onChangeText={catatan => setCatatan(catatan)}
                    />
                </View>
                <GarisBatas/>
                <View style={styles.kotak}>
                    <View style={styles.atas}>
                        <View style={{flex: 1.5}}>
                            <Image source={{uri: foto_akun}} style={styles.foto}/>
                        </View> 
                        <View style={{flex: 4.5}}>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>{namatoko}</Text>
                            <Text style={{fontSize: 12, fontStyle:'italic'}}>
                                Mitra akan sampai di lokasi kamu paling lambat 40 menit
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={styles.batal}
                            onPress={() => navigation.goBack()}
                        >
                            Batal
                        </Text>
                        <TouchableOpacity style={styles.panggil}
                            onPress={handlePanggil}
                            >
                            <Text style={{fontSize: 16, color:Putih, fontWeight:'bold'}}>Panggil</Text>
                        </TouchableOpacity>     
                    </View>
                </View>
            </ScrollView>
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
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: 5,
    },
    atas:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
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
        backgroundColor: Ijo,
        borderRadius: 10,
        width: '45%',
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    batal:{
        backgroundColor: Putih,
        borderRadius: 10,
        width: '45%',
        paddingVertical: 8,
        fontSize: 16,
        textAlign:'center',
        color: Ijo,
        fontWeight:'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    deskripsi:{
        fontSize: 16,
        color: Ijo,
    },
    kotak:{
        padding: 10,
        backgroundColor: IjoMint,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: height * 0.05,
    }
})