import { Image, StyleSheet, Text, View, Dimensions, Pressable, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih, Hitam } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'
import { Perjalanan, Tiba, TerimaKasihPM, Load1, Load2, Load3 } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import * as Linking from 'expo-linking';
import { batalPMolehPelanggan, kirimRating } from '../../API/firebasemethod'


const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  const db = getFirestore(app)

  const [panggilan, setPanggilan] = useState("Diterima")
  
  const [namatoko, setNamatoko] = useState();
  const [namamitra, setNamamitra] = useState();
  const [phonemitra, setPhonemitra] = useState();
  const [alamat_pelanggan, setAlamat_pelanggan] = useState();
  const [catatan, setCatatan] = useState();
  const [estimasi_waktu, setEstimasi_waktu] = useState();
  const [jarak, setJarak] = useState();
  const [hargasubtotal, setHargasubtotal] = useState();
  const [hargalayanan, setHargalayanan] = useState();
  const [hargatotalsemua, setHargatotalsemua] = useState();
  const [produk, setProduk] = useState();

  const telepon = () => {
    Linking.openURL(`tel:${phonemitra}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonemitra}`);
  };

  const { 
    id_transaksi, id_mitra,
     } = route.params;

  useEffect(() =>{ 
    async function getStatusPM(){
      try{
        const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
        setPanggilan(doc.data().panggilan);
        setHargasubtotal(doc.data()?.hargasubtotal);
        setHargalayanan(doc.data()?.hargalayanan);
        setHargatotalsemua(doc.data()?.hargatotalsemua);
        setProduk(doc.data()?.produk);
          // Respond to data
          // ...
        });
        //unsubscribe();
      } catch (err){
        Alert.alert('Ada error sama status PM.', err.message)
      }
    }
    getStatusPM();
  },[]);

  useEffect(() => {
    const lihatRespon =  () => {
      if(panggilan == "Dibatalkan Mitra"){
          navigation.replace('HomeScreen');
          Alert.alert(
            'Mitra membatalkan panggilan','Mohon maaf, sepertinya mitra sedang ada kendala saat ini.'
          );
      } 
    } 
    lihatRespon();
  },[panggilan]);
 
    useEffect(() =>{ 
    async function getDetailTransaksi(){
      const docRef = doc(db, "transaksi", id_transaksi);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setNamatoko(docSnap.data().namatoko);
        setNamamitra(docSnap.data().namamitra);
        setPhonemitra(docSnap.data().phonemitra);
        setAlamat_pelanggan(docSnap.data().alamat_pelanggan);
        setCatatan(docSnap.data().catatan);
        setEstimasi_waktu(docSnap.data().estimasi_waktu);
        setJarak(docSnap.data().jarak);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getDetailTransaksi();
  },[])

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
              onPress: () =>{
                batalPMolehPelanggan();
                navigation.navigate('HomeScreen')
              },
            }
          ]
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
                            <Ionicons name="star" size={22} color={Hitam} style={{marginHorizontal:3, opacity: 0.5}}/>
                            )
                           }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
  };

  const NilaiBintangProduk = () => {
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
                            <Ionicons name="star" size={22} color="orange" style={{marginHorizontal:3}}/>
                            ):(
                            <Ionicons name="star" size={22} color={Hitam} style={{marginHorizontal:3, opacity: 0.5}}/>
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

  return (
    <ScrollView style={styles.latar}>
      <View style={styles.atas}>
        <Pressable onPress={()=> navigation.navigate('HomeScreen')}>
            <Ionicons name="chevron-back-outline" size={30} color={Putih} />
        </Pressable>
        <Text  style={{fontSize:20, color:Putih, textAlign:'center', alignSelf:'center'}} numberOfLines={1}>{namatoko}</Text>
      </View>
      { panggilan == "Diterima" ? (
          <Image source={Perjalanan} style={styles.gambar}/>        
        ): panggilan == "Sudah Sampai" ? (
          <Image source={Tiba} style={styles.gambar}/>
        ) : (
          <Image source={TerimaKasihPM} style={styles.gambar}/>
        )
      }
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
      </View>
          
      {panggilan != "Selesai" && 
        <GarisBatas/>
      }    
        
      <View style={styles.bagian}>

        { panggilan != "Selesai" ? 
          (
            <View>
              <View style={{marginBottom: 10}}>
                  <Text style={{fontSize:14, fontWeight:'bold', color:IjoTua}}>Tujuan Lokasi</Text>
                  <Text numberOfLines={3}>{alamat_pelanggan}</Text>
              </View>
              <View style={styles.catatan}>
                  <Text style={{fontSize:14, fontStyle:'italic', fontWeight:'bold', color:IjoTua}}>Catatan Lokasi</Text>
                  <Text numberOfLines={3}>{catatan}</Text>
              </View>
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
                      <NilaiBintangProduk/>
                  </View>
              </View>
              { pilihlayanan && pilihproduk &&
                <TouchableOpacity style={styles.kirim} onPress={kirimNilai}>
                    <Text style={{color: Ijo, fontWeight:'bold', textAlign:'center'}}>Kirim Penilaian</Text>
                </TouchableOpacity>
              }
            </View>
          )
        }
      </View>

      {panggilan == "Selesai" && 
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
                                    <Text style={styles.produk}>Rp{items[0]?.harga}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingRight: 10}}>
                                <Text style={styles.harga}>Rp{items.length*items[0]?.harga}</Text>
                            </View>
                        </View>
                      </View>
                    ))} 
                    <View style={{marginTop: 10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Subtotal</Text>
                            <Text>
                                <Text>Rp</Text>
                                <Text>{hargasubtotal}</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Biaya Layanan</Text>
                            <Text>
                                <Text>Rp</Text>
                                <Text>{hargalayanan}</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text>Total Harga</Text>
                            <Text style={styles.harga}>
                                <Text>Rp</Text>
                                <Text>{hargatotalsemua}</Text>
                            </Text>
                        </View>
                    </View>
              </View>

              ) }
          </View>
        </View>
      }    

        { panggilan == "Diterima" &&
          <TouchableOpacity style={styles.tombol} onPress={handleBatal}>
              <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textAlign:'center'}}>Batalkan Pesanan</Text>
          </TouchableOpacity>
        }

        { panggilan == "Selesai" &&
        <TouchableOpacity style={styles.tombol}  onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textAlign:'center'}}>Tutup</Text>
        </TouchableOpacity>
        }
    </ScrollView>
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
        height: height * 0.05,
        alignSelf:'center',
        borderRadius: 10,
        flex: 1,
    },
    tulisan:{
        color: Ijo,
        textAlign:'center',
        fontSize: 16,
    },
    catatan:{
        marginBottom: 20, 
        backgroundColor: Putih, 
        padding: 10, 
        borderRadius: 10, 
        borderColor: Ijo, 
        borderWidth: 1,
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
    tombol:{
        width: '90%',
        backgroundColor: IjoMint,
        borderRadius: 10,
        padding: 10,
        alignSelf:'center',
        marginTop: 40,
        marginBottom: 20,
    },
})