import { Image, StyleSheet, Text, View, Dimensions, Pressable, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih, Hitam } from '../Utils/Warna'
import { Call, Chat } from '../assets/Icons/Index'
import { Perjalanan, Tiba, TerimaKasihPM, Load1, Load2, Load3 } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import * as Linking from 'expo-linking';
import { batalPMolehPelanggan, kirimRating } from '../../API/firebasemethod'
import { useFocusEffect } from '@react-navigation/native';
import "intl";
import "intl/locale-data/jsonp/id";

const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  const [panggilan, setPanggilan] = useState()
  
  const [namatoko, setNamatoko] = useState();
  const [namamitra, setNamamitra] = useState();
  const [phonemitra, setPhonemitra] = useState();
  const [alamat_pelanggan, setAlamat_pelanggan] = useState();
  const [catatan_lokasi, setCatatan_lokasi] = useState();
  const [estimasi_waktu, setEstimasi_waktu] = useState();
  const [hargasubtotal, setHargasubtotal] = useState();
  const [hargalayanan, setHargalayanan] = useState();
  const [hargatotalsemua, setHargatotalsemua] = useState();
  const [produk, setProduk] = useState();
  const [potongan, setPotongan] = useState();
  const [pembatalan, setPembatalan] = useState();

  const telepon = () => {
    Linking.openURL(`tel:${phonemitra}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonemitra}`);
  };

  const { 
    id_transaksi, id_mitra,
     } = route.params;

  useFocusEffect(
    useCallback(() => {
      const db = getFirestore(app)
          const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
            if(pembatalan == "Dibatalkan Mitra"){
              navigation.replace('HomeScreen');
              Alert.alert(
                'Mitra membatalkan panggilan','Mohon maaf, sepertinya mitra sedang ada kendala saat ini.'
              );
            } 
          setPanggilan(doc.data().panggilan);
          setHargasubtotal(doc.data()?.hargasubtotal);
          setHargalayanan(doc.data()?.hargalayanan);
          setHargatotalsemua(doc.data()?.hargatotalsemua);
          setProduk(doc.data()?.produk);
          setNamatoko(doc.data().namatoko);
          setNamamitra(doc.data().namamitra);
          setPhonemitra(doc.data().phonemitra);
          setAlamat_pelanggan(doc.data().alamat_pelanggan);
          setCatatan_lokasi(doc.data()?.catatan_lokasi);
          setEstimasi_waktu(doc.data().estimasi_waktu);
          setPotongan(doc.data().potongan);
          setPembatalan(doc.data()?.pembatalan);
        });
          return () => {
            console.log('Otw Unmounted') 
            unsubscribe();
          }
    },[pembatalan]) 
  );

  const handleBatal =()=> {
    Alert.alert('Anda yakin ingin membatalkan panggilan?','Mitra yang sedang di jalan bisa kecewa loh.',
          [
            {
              text: 'Tutup',
              onPress: () => {
                console.log('Tutup dipencet')
              }
            },
            {
              text: 'Yakin',
              onPress: async () =>{
                await batalPMolehPelanggan(id_transaksi, id_mitra);
                navigation.navigate('HomeScreen')
              },
            }
          ]
          )
  }

  const GambarAtas = () => {
    return(
      <View>
        { panggilan == "Diterima" ? (
            <Image source={Perjalanan} style={styles.gambar}/>        
          ): panggilan == "Sudah Sampai" ? (
            <Image source={Tiba} style={styles.gambar}/>
          ) : (
            <Image source={TerimaKasihPM} style={styles.gambar}/>
          )
        }
      </View>
    )
  }

  const StatusTransaksi = () => {
    return(
      <View>
        { panggilan == "Diterima" ? (
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{flex: 1.5}}>
                <Text style={[styles.tulisan, {textAlign:'left'}]}>Mitra dalam perjalanan</Text>
                <Text style={{fontSize: 12}}>Estimasi sampai: {estimasi_waktu}</Text>
              </View>  
              <Image source={Load1} style={styles.load}/>
            </View>      
          ): panggilan == "Sudah Sampai" ? (
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{flex: 1.5}}>
                <Text style={[styles.tulisan, {textAlign:'left'}]}>Mitra sudah sampai</Text>
                <Text style={{fontSize: 12}}>Selamat berbelanja</Text>
              </View>  
              <Image source={Load2} style={styles.load}/>
            </View>      
          ) : (
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{flex: 1.5}}>
                <Text style={[styles.tulisan, {textAlign:'left'}]}>Transaksi sudah selesai</Text>
                <Text style={{fontSize: 12}}>Yuk bantu evaluasi mitra!</Text>
              </View>  
              <Image source={Load3} style={styles.load}/>
            </View>     
          )
        }
      </View>
    )
  }

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

  const TombolPenilaian = () => {
    return(
      <View>
        { pilihlayanan && pilihproduk ? (
          <TouchableOpacity style={styles.kirim} onPress={kirimNilai}>
              <Text style={{color: Ijo, fontWeight:'bold', textAlign:'center'}}>Kirim Penilaian</Text>
          </TouchableOpacity>
        ):(null)
        }
      </View>
    )
  };

  const kirimNilai = () => {
    kirimRating(pilihlayanan, pilihproduk, id_mitra, id_transaksi);
    Alert.alert('Nilai sudah masuk','Terima kasih atas penilaian anda.');
    navigation.replace('HomeScreen');
  };

  const CatatanLokasiOTW = () => {
    return(
      <View>
        { catatan_lokasi ? 
          (
          <View style={styles.catatan}>
              <Text style={{fontSize:14, fontStyle:'italic', fontWeight:'bold', color:IjoTua}}>Catatan Lokasi</Text>
              <Text numberOfLines={3}>{catatan_lokasi}</Text>
          </View>
          ):(
          <View style={styles.catatan}>
              <Text style={{fontSize:14, fontStyle:'italic', color:IjoTua}}>Tanpa catatan lokasi</Text>
          </View>
          )
        }
      </View>
    )
  }

  const VoucherPromo = () => {
    return(
      <View>
      { panggilan == "Sudah Sampai" ? 
        (
          <Pressable style={styles.promo} onPress={pindahVoucher}>
              <View style={{backgroundColor: Ijo, padding: 8, borderRadius: 20}}>
                <Ionicons name="pricetags" size={20} color={IjoMint}/>
              </View>
              <Text style={[styles.judul, {color:Ijo}]}>Pilih Voucher</Text>
              <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
          </Pressable>
        ):(null)
      }
      </View>
    )
  };

  const pindahVoucher = () => {
    navigation.navigate('VoucherScreen',{
      jenis_layanan: "Panggil Mitra",
    })
  }

  const Lokasi_Rating = () => {
    return(
      <View>
        { panggilan != "Selesai" ? 
          (
            <View>
              <View style={{marginBottom: 10}}>
                  <Text style={{fontSize:14, fontWeight:'bold', color:IjoTua}}>Tujuan Lokasi</Text>
                  <Text numberOfLines={3}>{alamat_pelanggan}</Text>
              </View>
              <CatatanLokasiOTW/>
          </View>
          ):(
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
              <TombolPenilaian/>
            </View>
          )
        }
      </View>
    )
  }

  const RincianBelanja = () => {
    return(
      <View>
         {panggilan == "Selesai" ? (
          <View>
            <GarisBatas/>
            <View style={styles.bagian}>
                <Text style={{fontSize:16, fontWeight:'bold', color:IjoTua, marginBottom: 10}}>Rincian Belanjaan</Text>
                { !produk ? (
                    <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                      <ActivityIndicator size="small" color={IjoTua}/>
                    </View>
                ):(
                <View>
                    {Object.entries(produk).map(([key, items]) => (
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
                      <View style={{marginTop: 10}}>
                          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                              <Text>Subtotal</Text>
                              <Text>
                                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargasubtotal).toString()}</Text>
                              </Text>
                          </View>
                          { potongan ? (
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>Potongan</Text>
                                <Text>
                                    <Text>-Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
                                </Text>
                            </View>
                            ):(null)
                          }
                          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                              <Text>Biaya Layanan</Text>
                              <Text>
                                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargalayanan).toString()}</Text>
                              </Text>
                          </View>
                          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                              <Text>Total Harga</Text>
                              <Text style={styles.harga}>
                                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargatotalsemua).toString()}</Text>
                              </Text>
                          </View>
                      </View>
                </View>

                ) }
            </View>
          </View>
         ):(null)
        }  
      </View>
    )
  }

  const BatalinTransaksi = () => {
    return(
      <View>
        <TouchableOpacity style={styles.tombol} onPress={handleBatal}>
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textAlign:'center'}}>Batalkan Pesanan</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const TutupPesanan = () => {
    return(
      <View>
        <TouchableOpacity style={styles.tombol}  onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textAlign:'center'}}>Tutup</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.latar}>
    
      { !panggilan ? 
        (
        <View style={{justifyContent:'center', alignItems:'center', marginTop: height * 0.45}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
        ):(
          
        <View>
          <View style={styles.atas}>
            <Pressable onPress={()=> navigation.navigate('HomeScreen')}>
                <Ionicons name="chevron-back-outline" size={30} color={Putih} />
            </Pressable>
            <Text  style={{fontSize:20, color:Putih, textAlign:'center', alignSelf:'center', fontWeight:'bold'}} numberOfLines={1}>{namatoko}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <GambarAtas/>
          <View style={styles.bagian}>
              <View style={{ flexDirection:'row', marginBottom: 5, alignItems:'center' }}>
                  <View style={{flex: 2}}>
                    <Text>Nama Pengelola</Text>
                    <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}} numberOfLines={1}>
                      {namamitra}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row', flex: 1}}>
                    <Pressable onPress={telepon}>
                        <Image source={Call} style={styles.icon} />
                    </Pressable>
                    <Pressable onPress={sms}>
                        <Image source={Chat} style={styles.icon} />
                    </Pressable>
                  </View>
              </View>
          </View>
          <GarisBatas/>
          <View style={styles.bagian}>
            <View style={{marginBottom: 10}}>
              <StatusTransaksi/>
              <VoucherPromo/>
            </View>
          </View>
              
          {panggilan != "Selesai" ? 
            (
              <GarisBatas/> 
            ):(null)
          }    
           
          <View style={styles.bagian}>
            <Lokasi_Rating/>
          </View>

          <RincianBelanja/>  
          { panggilan == "Diterima" ?
            (<BatalinTransaksi/>) : 
            panggilan == "Selesai" ?
            (<TutupPesanan/>):(null)
          }

          </ScrollView>
        </View>
        )
      }
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    atas:{
        paddingTop: 40,
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 10,
        backgroundColor: Ijo,
        paddingBottom: 10,
    },
    bagian:{
        paddingHorizontal: 20,
        marginVertical: 5,
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
        marginLeft: 15,
    },
    gambar:{
        width: width,
        height: height * 0.3,
        alignSelf:'center',
        marginBottom: 10,
    },
    load:{
        width: width * 0.4,
        height: height * 0.08,
        alignSelf:'center',
        borderRadius: 10,
        flex: 1,
    },
    judul:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
        marginBottom: 5,
  },
    tulisan:{
        color: Ijo,
        textAlign:'center',
        fontSize: 16,
    },
    catatan:{
        marginBottom: 10, 
        backgroundColor: Putih, 
        padding: 10, 
        borderRadius: 10, 
        borderColor: Ijo, 
        borderWidth: 1,
    },
    promo:{
        flexDirection:'row',
        borderColor: Ijo,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    kirim:{
        borderColor: Ijo,
        borderWidth: 2,
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    harga:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
    },
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
    },
    card:{
      borderColor: Ijo,
      borderWidth: 0.3,
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
    tombol:{
        width: '90%',
        backgroundColor: IjoMint,
        borderRadius: 10,
        padding: 10,
        alignSelf:'center',
        marginTop: 10,
        marginBottom: height * 0.2,
    },
})