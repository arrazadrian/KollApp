import { StyleSheet, Text, View, Image,  TextInput, ScrollView, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Abu, Hitam, Ijo, IjoMint, IjoTua, Kuning, Pink, Putih } from '../Utils/Warna'
import { DPkartu, Gerobak, Pinkecil } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';
import { buatTransaksiPM } from '../../API/firebasemethod';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { updateBobot } from '../features/bobotSlice';

const { height, width } = Dimensions.get('window')

const LokasiScreen = ({ route }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { 
        namatoko, foto_akun, id_mitra, namalengkap_mitra, phonemitra, geo_mangkal, token_notifmitra,
         } = route.params;

    const { alamat, geo } = useSelector(state => state.posisi);
    const { namapelanggan } = useSelector(state => state.pelanggan);
    const { hargalayanan } = useSelector(state => state.bobot);
    const [catatan, setCatatan] = useState("");

    const handlePanggil = async () => {
     const kode_transaksi = await buatTransaksiPM(
            alamat, 
            geo, 
            catatan,
            id_mitra,
            namalengkap_mitra, 
            namatoko,
            phonemitra,
            namapelanggan,
            hargalayanan,
            token_notifmitra,
        );
    console.log('id Transaksi isinya: ' + kode_transaksi);
        navigation.replace('LoadingScreen',{
            id_transaksi: kode_transaksi,
            id_mitra: id_mitra,
        })
    };

         //Dapetin jarak dan waktu perjalanan mitra ke pelanggan 
         useEffect(()=>{
            //gausah run kalo udah ada isi
            if (hargalayanan != null) return;
           (async () => {
               fetch(
                   `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${geo_mangkal.lat},${geo_mangkal.lng}&destinations=${geo.lat},${geo.lng}
                   &key=${GOOGLE_MAPS_APIKEY}&mode=walking`
               ).then((res) => res.json())
               .then((data) => {
                   //console.log(data.rows[0].elements[0].duration.text);
                  console.log(data.rows[0].elements[0].distance.value);
    
                  let hasilbagi = Math.floor(data.rows[0].elements[0].distance.value / 1000);
    
                  let hargalayanan = hasilbagi * 10000
                  // console.log(hargalayanan)
                  dispatch(updateBobot({
                    hargalayanan: hargalayanan,
                    }));
    
               }) 
           })();
       },[]);


    const VoucherPromo = () => {
    return(
        <Pressable style={styles.promo} onPress={pindahVoucher}>
            <View style={{backgroundColor: Ijo, padding: 8, borderRadius: 20}}>
            <Ionicons name="pricetags" size={20} color={IjoMint}/>
            </View>
            <Text style={[styles.judul, {color:Ijo}]}>Lihat Voucher</Text>
            <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
        </Pressable>
    )
    };

    const pindahVoucher = () => {
    navigation.navigate('VoucherScreen',{
        jenis_layanan: "Panggil Mitra",
    })
    }
    
  return (
    <View style={{flex: 1}}>
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
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: IjoTua}}>Pastikan lokasi kamu benar</Text>
                    </View>
                    <View style={{marginVertical:5, flexDirection:'row', alignItems:'center', width: width * 0.8}}>
                        <Image source={Pinkecil} style={styles.location} />
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
                <VoucherPromo/>
                <GarisBatas/>
                <View style={styles.kotak}>
                    <View style={styles.atas}>
                        <View style={{flex: 1.5}}>
                            { foto_akun ?
                                (
                                <Image source={{uri: foto_akun}} style={styles.foto}/>
                                ):(
                                <Image source={Gerobak} style={styles.foto}/>
                                )
                            }
                        </View> 
                        <View style={{flex: 4}}>
                            <Text style={{fontSize: 16, fontWeight:'bold', color:IjoTua}}>{namatoko}</Text>
                            <Text style={{fontSize: 12, fontWeight:'bold'}}>
                                Biaya layanan: Rp{hargalayanan}
                            </Text>
                            <Text style={{fontSize: 12, fontStyle:'italic'}}>
                                Estimasi waktu mitra sampai akan tampil setelah mitra menerima panggilan
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <TouchableOpacity style={styles.batal} onPress={() => navigation.goBack()}>
                            <Text style={{fontSize: 16,textAlign:'center', color: Ijo, fontWeight:'bold'}}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.panggil} onPress={handlePanggil}>
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
        height: height * 0.4,
        flex: 1.2,
      },
    bungkus:{
        width: width,
        height: height * 0.55,
        backgroundColor: Kuning,
        paddingHorizontal: 20,
    },
    foto:{
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 5,
        backgroundColor:'tan',
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
    judul:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    promo:{
        flexDirection:'row',
        borderColor: Ijo,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    panggil:{
        backgroundColor: Ijo,
        borderRadius: 10,
        width: '47%',
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    batal:{
        backgroundColor: Putih,
        borderRadius: 10,
        width: '47%',
        paddingVertical: 8,
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