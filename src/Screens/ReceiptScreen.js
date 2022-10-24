import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import * as Linking from 'expo-linking';
import { Ijo, IjoMint, IjoTua, Kuning, Hitam, Putih } from '../Utils/Warna'
import { Kasbon, KollLong, Lunas, Pinkecil } from '../assets/Images/Index';
import moment from 'moment';
import localization from 'moment/locale/id';
import GarisBatas from '../Components/GarisBatas';
import { Call, Chat } from '../assets/Icons/Index';
import Ionicons from '@expo/vector-icons/Ionicons';
import { kirimRating } from '../../API/firebasemethod';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../Firebase/config';


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({navigation, route}) => {

  moment.updateLocale('id', localization)

  const { 
    hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
    jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu_selesai, waktu_dipesan, alamat_pelanggan,
    status_transaksi, catatan_lokasi,catatan_produk, pembayaran, phonemitra, phonepelanggan, rating_layanan, rating_produk,
     } = route.params;

  const telepon = () => {
    Linking.openURL(`tel:${phonemitra}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonemitra}`);
  };


  const [ pilihlayanan, setPilihlayanan ] = useState();
  const [ nilailayanan, setNilailayanan ] = useState([1,2,3,4,5]);
  const [ pilihproduk, setPilihproduk ] = useState();
  const [ nilaiproduk, setNilaiproduk ] = useState([1,2,3,4,5]);


  const NilaiBintangLayanan = () => {
    return(
        <View style={{flexDirection:'row', marginBottom: 10}}>
            {
                nilailayanan.map((item, key) => {
                    return(
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={()=> setPilihlayanan(item)}
                        >
                           { item <= pilihlayanan ? 
                            (
                            <Ionicons name="star" size={22} color="orange" style={{marginHorizontal:3}}/>
                            ):(
                            <Ionicons name="star" size={22} color={Hitam} style={{marginHorizontal:3, opacity: 0.2}}/>
                            )
                           }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
  };

  const NilaiDaunProduk = () => {
    return(
        <View style={{flexDirection:'row', marginBottom: 10}}>
            {
                nilaiproduk.map((item, key) => {
                    return(
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={()=> setPilihproduk(item)}
                        >
                           { item <= pilihproduk ? 
                            (
                            <Ionicons name="leaf" size={22} color="green" style={{marginHorizontal:3}}/>
                            ):(
                            <Ionicons name="leaf" size={22} color={Hitam} style={{marginHorizontal:3, opacity: 0.2}}/>
                            )
                           }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
  };

    const kirimNilai = () => {
      kirimRating(pilihlayanan, pilihproduk, id_mitra, id_transaksi);
      Alert.alert('Nilai sudah masuk','Terima kasih atas penilaian anda.');
      navigation.replace('HomeScreen');
    };

  const db = getFirestore(app)

  // //Untuk mendapatkan foto dan nama mitra,
  // useEffect(() => {
  //   async function getStatus(){
  //   const docRef = doc(db, "transaksi", id_transaksi);
  //   const docSnap = await getDoc(docRef);
    
  //   if (docSnap.exists()) {
  //       setAdarating(docSnap.data()?.rating)
  //   } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //   };
  //   };
  //   getStatus();
  // },[adarating]);

  const WaktuTransaksi = () => {
    return(
      <View>
        { waktu_selesai ? 
          (
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.deskatas}>Selesai Transaksi</Text>
              <Text style={styles.deskatas}>{moment(waktu_selesai.toDate()).calendar()}</Text>
          </View>
          ):(
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.deskatas}>Waktu Pemesanan</Text>
              <Text style={styles.deskatas}>{moment(waktu_dipesan.toDate()).calendar()}</Text>
          </View>
          )
        }
      </View>
    )
  };

  const TelponSms = () => {
    return(
      <View>
       { status_transaksi == "Dalam Proses" &&
          <View style={{flexDirection: 'row'}}>
            <Pressable onPress={telepon}>
                <Image style={styles.aksi} source={Call}/>
            </Pressable>
            <Pressable onPress={sms}>
                <Image style={styles.aksi} source={Chat}/>
            </Pressable>
          </View>
        }
      </View>
    )
  };

  const CapPembayaran = () => {
    return(
      <View>
        { pembayaran == "Tunai" ? 
          (
            <Image source={Lunas} style={styles.cap}/>
            ):(
            <Image source={Kasbon} style={styles.cap}/>
          )
        }
      </View>
    )
  };

  const RatingTransaksi = () => {
    return(
      <View>
        {!rating_layanan && !rating_produk  && status_transaksi == "Selesai" &&
        <View>
            <View style={styles.bagian}>
                    <View>
                    <Text style={{fontSize: 16, fontWeight:'bold', color: IjoTua, fontStyle:'italic', textAlign:'center'}}>
                      Berikan penilaian anda untuk mitra ini
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <View style={{ alignItems:'center'}}>
                            <Text style={{color: Ijo, fontSize: 24, fontWeight:'bold', textAlign: 'center'}}>Layanan</Text>
                            <NilaiBintangLayanan/>
                        </View>
                        <View style={{ alignItems:'center'}}>
                            <Text style={{color: Ijo, fontSize: 24, fontWeight:'bold', textAlign: 'center'}}>Produk</Text>
                            <NilaiDaunProduk/>
                        </View>
                    </View>
                    { pilihlayanan && pilihproduk &&
                      <TouchableOpacity style={styles.kirim} onPress={kirimNilai}>
                          <Text style={{color: Ijo, fontWeight:'bold', textAlign:'center'}}>Kirim Penilaian</Text>
                      </TouchableOpacity>
                    }
                  </View>
            </View>
        <GarisBatas/>
        </View>
        }
      </View>
    )
  };

  const AlamatPelanggan = () => {
    return(
      <View>
         { alamat_pelanggan &&
        <View>
            <View style={styles.bagian}>
                <Text  style={styles.subjudul}>Alamat Tujuan</Text>
                <View style={{flexDirection:'row', alignItems:'center', width:'90%'}}>
                  < Image source={Pinkecil} style={styles.location} />
                    <Text>{alamat_pelanggan}</Text>
                </View>
                <CatatanLokasi/>
            </View>
            <GarisBatas/>
        </View>
        }
      </View>
    )
  };

  const CatatanLokasi = () => {
    return(
      <View>
        {catatan_lokasi ?(
          <View style={styles.catatan}>
            <Text style={{fontWeight:'bold'}}>Catatan lokasi</Text>
            <Text style={{fontStyle:'italic'}}>{catatan_lokasi}</Text>
          </View>
        ):(
          <View style={styles.catatan}>
            <Text style={{fontStyle:'italic'}}>Tanpa catatan lokasi...</Text>
          </View>
        ) 
        }
      </View>
    )
  };

  return (
    <View style={styles.latar}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', paddingTop: 20}}>
          <View>
              <Image source={KollLong} style={styles.logo}/>
          </View>
          <View>
              <Text style={{color: IjoTua, fontSize: 16, fontWeight: 'bold', marginBottom: -5}}>
                Nama Toko
              </Text>
              <Text style={{color: Ijo, fontSize: 18, fontWeight: 'bold'}}>
                {namatoko}
              </Text>
          </View>
        </View>
        <View style={styles.bagian}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.deskatas}>Jenis Layanan</Text>
                <Text style={styles.deskatas}>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.deskatas}>ID Transaksi</Text>
                <Text style={styles.deskatas}>{id_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.deskatas}>Status Transaksi</Text>
                  <Text style={styles.deskatas}>{status_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.deskatas}>Pembayaran</Text>
                  <Text style={styles.deskatas}>{pembayaran}</Text>
            </View>
            <WaktuTransaksi/>
        </View>

        <GarisBatas/>
        
        <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                    <Text style={styles.subjudul}>Nama Mitra</Text>
                    <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>{namamitra}</Text>
                </View>
                <TelponSms/>
                <CapPembayaran/>
              </View>
        </View>
      
        <GarisBatas/>
        
        <RatingTransaksi/>
          
        <AlamatPelanggan/>

        <View style={styles.bagian}>
          <View  style={{marginBottom: height* 0.2}}>
            <Text  style={styles.subjudul}>Daftar Produk</Text>
                { jenislayanan == "Pre-Order" && catatan_produk ?
                  (
                    <View style={styles.catatan}>
                      <Text style={{fontWeight:'bold'}}>Catatan Produk</Text>
                      <Text style={{fontStyle:'italic'}}>{catatan_produk}</Text>
                    </View>
                  ): jenislayanan == "Pre-Order" && !catatan_produk ? (
                    <View style={styles.catatan}>
                      <Text style={{fontStyle:'italic'}}>Tanpa catatan produk...</Text>
                    </View>
                  ):(<View/>)
                }
              {Object.entries(produk).map(([key, items]) => (
                  <View key={key}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.deskripsi}>
                            <Text>{items.length}x   </Text>
                            <Text>{items[0]?.namaproduk}</Text>
                        </Text>
                        <Text style={styles.harga}>
                            <Text>Rp</Text>
                            <Text>{items[0]?.harga * items.length}</Text>
                        </Text>
                    </View>
                  </View>
              ))}
          </View>
        </View>

      </ScrollView>
      <View style={styles.bawah}>
          <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text>Sub Total</Text>
                  <Text>Rp{hargasubtotal}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text>Biaya Layanan</Text>
                  <Text>Rp{hargalayanan}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Total Harga</Text>
                  <Text style={styles.subjudul}>Rp{hargatotalsemua}</Text>
              </View>
          </View>
      </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: Kuning,
    height: height,
  },
  logo:{
     width: width*0.29,
     height: height*0.06,
     marginRight: 10,
  },
  cap:{
     width: width*0.2,
     height: width*0.2,
     marginVertical: -10,
  },
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
  },
  deskatas:{
    fontSize: 12,
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  aksi:{
    width: width * 0.1,
    height: width * 0.1,
    marginHorizontal: 5,
  },
  location:{
    width: width * 0.05,
    height: width * 0.05,
    marginRight:5,
  },
  catatan:{
      borderColor: Ijo,
      borderWidth:1,
      borderRadius: 10,
      padding: 10,
      width: '100%',
      marginVertical: 10,
  },
  harga:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
  },
  bawah:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position:'absolute',
    bottom:0,
    width: width,
    backgroundColor:IjoMint,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection:'column-reverse',
  },
  bagian:{
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ekspresi:{
    fontSize: 18,
    color: Ijo,
    fontWeight:'bold',
    marginBottom: 10,
  },
  kirim:{
    borderColor: Ijo,
    borderWidth: 2,
    width: '100%',
    padding: 10,
    borderRadius: 10,
},

}) 