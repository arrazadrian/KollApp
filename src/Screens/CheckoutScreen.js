import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Pinkecil } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';
import GarisBatas from '../Components/GarisBatas';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { kosongkanKeranjang, pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice';
import { buatTransaksiPO, updateJmlVoucher, updatePoinPotongan, updateTersediaVoucher } from '../../API/firebasemethod';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { updateBobot } from '../features/bobotSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import "intl";
import "intl/locale-data/jsonp/id";
import { resetVoucher } from '../features/voucherSlice';

const { height, width } = Dimensions.get('window')

const CheckoutScreen = ({ route }) => {

  const { alamat, geo } = useSelector(state => state.posisi);
  const { namapelanggan } = useSelector(state => state.pelanggan);
  const { hargalayanan } = useSelector(state => state.bobot);
  const { potongan, id_voucher } = useSelector(state => state.voucher);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]); 
  const [catatan_lokasi, setCatatan_lokasi] = useState("");
  const [catatan_produk, setCatatan_produk] = useState("");
  // const [pembayaran, setPembayaran] = useState("COD");

  const { 
    id_mitra, namalengkap_mitra, namatoko, phonemitra, geo_mangkal,
     } = route.params;

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

              let hargalayanan = hasilbagi * 2500
              // console.log(hargalayanan)
              dispatch(updateBobot({
                hargalayanan: hargalayanan,
                }));
           }) 
       })();
   },[]);


  const subtotalhargaKeranjang = useSelector(totalHarga);
  //Harga Layanan dari redux, declare di atas
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan - potongan;

  const handlePesanPO = async () => {
    let jumlah_kuantitas = items.length;
        if (!alamat) {
          Alert.alert('Alamat masih kosong','Isi alamat dengan benar.');
        } else if (!items) {
          Alert.alert('Tidak ada belnjaan','Isi email dengan benar.');
        } else if (!phonemitra) {
          Alert.alert('Ada nomor telepon kosong','Aantara pelanggan atau mitra.');
        } else if (!phonemitra) {
          Alert.alert('Ada nomor telepon kosong','Aantara pelanggan atau mitra.');
        } else {
          buatTransaksiPO(
            alamat,
            geo,
            catatan_lokasi,
            id_mitra, 
            namalengkap_mitra,
            namatoko,
            phonemitra,
            namapelanggan,
            kelompokProduk,
            catatan_produk,
            subtotalhargaKeranjang,
            hargalayanan,
            hargatotalsemua,
            id_voucher,
            potongan,
            jumlah_kuantitas,
          );
          if(potongan > 0){
            // updatePoinPotongan(id_mitra, potongan);
            // updateJmlVoucher(id_voucher);
            updateTersediaVoucher(id_mitra, id_voucher, potongan);
          };
          navigation.navigate("TQScreen");
        };
   
  };

  const VoucherPromo = () => {
    return(
      <Pressable style={styles.promo} onPress={pindahVoucher}>
          <View style={{backgroundColor: Ijo, padding: 8, borderRadius: 20}}>
            <Ionicons name="pricetags" size={20} color={IjoMint}/>
          </View>
          { potongan ? (
            <Text style={[styles.judul, {color:Ijo}]}>Voucher Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
            ):(
            <Text style={[styles.judul, {color:Ijo}]}>Pilih Voucher</Text>
          )
          }
          <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
      </Pressable>
    )
  };

  const pindahVoucher = () => {
    navigation.navigate('VoucherScreen',{
      jenis_layanan: "Pre-Order",
      subtotalhargaKeranjang: subtotalhargaKeranjang,
    })
  }

  return (
    <View style={styles.latar}>
      <View style={{flex: 8}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bagian}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.judul}>Lokasi Antar</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
              <Image source={Pinkecil} style={styles.locationlogo} />
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
                  style={styles.inputlokasi} 
                  placeholder='Beri catatan lokasi...'
                  multiline={true}
                  value={catatan_lokasi}
                  onChangeText={catatan => setCatatan_lokasi(catatan)}
            />
        </View>

        <GarisBatas/>

        <View style={styles.bagian}>

        <Text style={styles.judul}>Produk Pesanan</Text>
        <TextInput 
                  style={styles.inputproduk} 
                  placeholder='Beri catatan produk...'
                  multiline={true}
                  value={catatan_produk}
                  onChangeText={catatan => setCatatan_produk(catatan)}
            />
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
                        <Text style={styles.produk}>Rp{new Intl.NumberFormat('id-Id').format(items[0]?.harga).toString()}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingRight: 10}}>
                    <Text style={styles.harga}>Rp{new Intl.NumberFormat('id-Id').format(items.length*items[0]?.harga).toString()}</Text>
                </View>
            </View>
          </View>
            ))}
        </View>
        
        <GarisBatas/>

        <View style={styles.bagian}>
            <VoucherPromo/>
            <Text style={styles.judul}>Rangkuman Transaksi</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Subtotal</Text>
                <Text style={[styles.judul, {fontWeight:'normal'}]}>
                    <Text>Rp{new Intl.NumberFormat('id-Id').format(subtotalhargaKeranjang).toString()}</Text>
                </Text>
            </View>
            { potongan > 0 &&
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text>Potongan</Text>
                  <Text style={[styles.judul, {fontWeight:'normal'}]}>
                      <Text>-Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
                  </Text>
              </View>
            }
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Biaya Layanan</Text>
                <Text style={[styles.judul, {fontWeight:'normal', marginBottom: 0}]}>
                    <Text>Rp{new Intl.NumberFormat('id-Id').format(hargalayanan).toString()}</Text>
                </Text>
            </View>
            <Text style={{fontStyle:'italic', fontSize: 12, marginBottom: height * 0.05 }}>*Termasuk ongkir</Text>
        </View>
      </ScrollView>
      </View>
      <View style={styles.simpulan}>
          <View style={styles.total}>
              <Text style={styles.judul}>Total Harga:</Text>
              <Text style={styles.harga}>
                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargatotalsemua).toString()}</Text>
              </Text>
          </View>
          <TouchableOpacity style={styles.pesan} 
            onPress={handlePesanPO}
          >
              <Text style={{color: Putih, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Pesan</Text>
          </TouchableOpacity>
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
      padding: 10,
      flexDirection: 'row',
      borderRadius: 3,
      marginVertical: 4,
      justifyContent:'space-between',
      borderColor: Ijo,
      borderWidth: 0.2,
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
    inputlokasi:{
        backgroundColor: Abu,
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 16,
    },
    inputproduk:{
        padding: 5,
        fontSize: 16,
        borderBottomColor: Ijo,
        borderBottomWidth: 1,
        marginBottom: 10,
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
        height: height * 0.26,
        backgroundColor: IjoMint,
    },
})