import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Location } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';
import GarisBatas from '../Components/GarisBatas';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { kosongkanKeranjang, pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice';
import { buatTransaksiPO } from '../../API/firebasemethod';

const { height, width } = Dimensions.get('window')

const CheckoutScreen = ({ route }) => {

  const { alamat, geo } = useSelector(state => state.posisi);
  const { namapelanggan } = useSelector(state => state.pelanggan);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]); 
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    const kelompok = items.reduce((results, item) => {
      (results[item.item.id] = results[item.item.id] || []).push(item.item);
      return results;
    }, {});

    const jikakosong = () => {
      if(!items.length){
        navigation.goBack();
      }
    };
    
    setKelompokProduk(kelompok);
    jikakosong();

  }, [items]);

  const { 
    id_mitra, namalengkap_mitra, namatoko
     } = route.params;

  const subtotalhargaKeranjang = useSelector(totalHarga);
  const hargalayanan =  1500;
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan;

  const handlePesanPO = () => {
    let jumlah_kuantitas = items.length;
      if (!alamat) {
        Alert.alert('Alamat masih kosong','Isi alamat dengan benar.');
      } else if (!items) {
        Alert.alert('Tidak ada belnjaan','Isi email dengan benar.');
      } else {
        buatTransaksiPO(
          alamat,
          geo,
          catatan,
          id_mitra, 
          namalengkap_mitra,
          namatoko,
          namapelanggan,
          kelompokProduk,
          subtotalhargaKeranjang,
          hargalayanan,
          hargatotalsemua,
          jumlah_kuantitas,
        );
        dispatch(kosongkanKeranjang());
        navigation.navigate("HomeScreen");
      };
  };

  return (
    <View style={styles.latar}>
      <View style={{flex: 8}}>
      <ScrollView>
        <View style={styles.bagian}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.judul}>Lokasi Antar</Text>
              <Text style={{fontSize: 18, fontWeight:'bold', color: Ijo, textDecorationLine:'underline'}}
                  onPress={() => navigation.navigate('FLocScreen')}
                  >Ubah</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
              <Image source={Location} style={styles.locationlogo} />
              <Text style={styles.deskripsi} numberOfLines={2}>{alamat}</Text>
            </View>
            <MapView style={styles.peta}
              initialRegion={{
                latitude: geo.lat,
                longitude: geo.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
            <Marker 
              coordinate={{
                latitude: geo.lat,
                longitude: geo.lng,
              }}
              title={namapelanggan}
              description="Lokasi Kamu"
              pinColor={'tomato'}
              identifier="pelanggan"
            />

            </MapView>
            <TextInput 
                  style={styles.input} 
                  placeholder='Beri catatan lokasi...'
                  multiline={true}
                  value={catatan}
                  onChangeText={catatan => setCatatan(catatan)}
            />
        </View>

        <GarisBatas/>

        <View style={styles.bagian}>

        <Text style={styles.judul}>Produk Pesanan</Text>
        {Object.entries(kelompokProduk).map(([key, items]) => (
            <View key={key}>
              <View style={styles.card}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingRight: 10}}>
                        <Text style={{fontSize: 14}}>{items.length}</Text>
                        <Text style={{fontSize: 14}}> x</Text>
                    </View>
                    <Image source={{uri: items[0]?.image}} style={styles.foto}/>
                    <View>
                        <Text style={styles.produk} numberOfLines={1}>{items[0]?.namaproduk}</Text>
                        <Text style={styles.produk}>Rp{items[0]?.harga}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingRight: 10}}>
                    <Text style={styles.harga}>Rp{items.length*items[0]?.harga}</Text>
                </View>
            </View>
          </View>
            ))}
        </View>
        
        <GarisBatas/>

        <View style={styles.bagian}>
            <Text style={styles.judul}>Rangkuman Transaksi</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Subtotal</Text>
                <Text style={styles.judul}>
                    <Text>Rp</Text>
                    <Text>{subtotalhargaKeranjang}</Text>
                </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Biaya Layanan</Text>
                <Text style={styles.judul}>
                    <Text>Rp</Text>
                    <Text>{hargalayanan}</Text>
                </Text>
            </View>
        </View>
      </ScrollView>
      </View>
      <View style={styles.simpulan}>
          <View style={styles.total}>
              <Text style={styles.judul}>Total Harga:</Text>
              <Text style={styles.harga}>
                  <Text>Rp</Text>
                  <Text>{hargatotalsemua}</Text>
              </Text>
          </View>
          <Pressable style={styles.pesan} 
            onPress={handlePesanPO}
          >
              <Text style={{color: Putih, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Pesan</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    bagian:{
        paddingHorizontal: 15,
        paddingVertical: 10,
    },  
    peta:{
        width: '100%',
        height: height*(1/6),
        borderRadius: 20,
        marginBottom: 10,
    },
    judul:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deskripsi:{
        fontSize: 14,
        color: IjoTua,
        width: width * 0.8,
    },
    card:{
      backgroundColor: Putih,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 10,
      marginVertical: 4,
      justifyContent:'space-between',
    },
    foto:{
      width: width * 0.15,
      height: width * 0.15,
      borderColor: Ijo,
      borderWidth: 1,
      borderRadius: 10,
      marginRight: 10,
    },
    produk:{
      fontSize: 14,
      width: width * 0.3,
  },
    harga:{
        fontSize: 18,
        color: IjoTua,
        fontWeight: 'bold',
    },
    locationlogo:{
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input:{
        backgroundColor: Abu,
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    total:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    pesan:{
        marginTop: 8,
        borderWidth: 2,
        borderColor: Ijo,
        borderRadius: 20,
        width: width * 0.9,
        height: height * 0.06,
        justifyContent:'center',
        backgroundColor: Ijo,
    },
    simpulan:{
        flex: 1,
        padding: 20,
        width: width,
        height: height * 0.16,
        backgroundColor: IjoMint,
    },
})