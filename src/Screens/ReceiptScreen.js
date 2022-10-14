import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import * as Linking from 'expo-linking';
import { Ijo, IjoMint, IjoTua, Kuning, Hitam, Putih } from '../Utils/Warna'
import { KollLong, Location } from '../assets/Images/Index';
import ListReceipt from '../Components/ListReceipt';
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
    status_transaksi, catatan, phonemitra, phonepelanggan, rating,
     } = route.params;

  const telepon = () => {
    Linking.openURL(`tel:${phonemitra}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonemitra}`);
  };

  const [ adarating, setAdarating ] = useState(rating);

  const [ pilih, setPilih ] = useState();
  const [ nilai, setNilai ] = useState([1,2,3,4,5]);
  const [ ekspresi, setEkspresi ] = useState();

  const NilaiBintang = () => {
      return(
          <View style={{flexDirection:'row', marginBottom: 10}}>
              {
                  nilai.map((item, key) => {
                      return(
                          <TouchableOpacity
                              activeOpacity={0.7}
                              key={item}
                              onPress={()=> setPilih(item)}
                          >
                             { item <= pilih ? 
                              (
                              <Ionicons name="star" size={40} color={Ijo} style={{marginHorizontal:5}}/>
                              ):(
                              <Ionicons name="star" size={40} color={Hitam} style={{marginHorizontal:5, opacity: 0.2}}/>
                              )
                             }
                          </TouchableOpacity>
                      )
                  })
              }
          </View>
      )
  };


  useEffect(() =>{
      function getEkspresi(){
          if(pilih == 5){
              setEkspresi("Sangat menyenangkan!!!");
          } else if (pilih == 4){
              setEkspresi("Keren banget kerjanya");
          } else if (pilih == 3){
              setEkspresi("Lumayanlah layanannya");
          } else if (pilih == 2){
              setEkspresi("Kurang memuaskan...")
          } else if (pilih == 1){
              setEkspresi("Nyebelin!!!")
          };
      };
      getEkspresi();
  },[pilih]);

  const db = getFirestore(app)

  //Untuk mendapatkan foto dan nama mitra,
  useEffect(() => {
    async function getStatus(){
    const docRef = doc(db, "transaksi", id_transaksi);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        setAdarating(docSnap.data()?.rating)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    };
    };
    getStatus();
  },[adarating]);

  const kirimNilai = () => {
      kirimRating(pilih, id_mitra, id_transaksi);
      Alert.alert('Nilai sudah masuk','Terima kasih atas penilaian anda.');
      navigation.goBack();
  };


  return (
    <View style={styles.latar}>
      <ScrollView style={{marginBottom: height* 0.15}} showsVerticalScrollIndicator={false}>

        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', marginBottom: 10, paddingTop: 20}}>
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
                <Text style={styles.subjudul}>Jenis Layanan</Text>
                <Text>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>ID Transaksi</Text>
                <Text>{id_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Status Transaksi</Text>
                  <Text>{status_transaksi}</Text>
            </View>
            { waktu_selesai ? 
                (
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Selesai Transaksi</Text>
                    <Text>{moment(waktu_selesai.toDate()).calendar()}</Text>
                </View>
                ):(
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Waktu Pemesanan</Text>
                    <Text>{moment(waktu_dipesan.toDate()).calendar()}</Text>
                </View>
                )
              }
        </View>

        <GarisBatas/>
        
        { !adarating && status_transaksi == "Selesai" &&
          <View> 
            <View style={{alignItems:'center'}}>
              <Text style={[styles.subjudul, {textAlign:'center'}]}>Beri penilaian layanan mitra kali ini</Text>
              <NilaiBintang/>
              { pilih &&
                <View style={{alignItems:'center'}}>
                    <Text style={styles.ekspresi}>{ekspresi}</Text>
                    <TouchableOpacity style={styles.kirim} onPress={kirimNilai}>
                        <Text style={{color: Putih, fontSize: 16, fontWeight:'bold', textAlign:'center'}}>Kirim</Text>
                    </TouchableOpacity>
                </View>
              }
            </View>
            <GarisBatas/>
          </View>
        }

      
        <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                    <Text style={styles.subjudul}>Nama Mitra</Text>
                    <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>{namamitra}</Text>
                </View>
                { status_transaksi == "Dalam Proses" ? (
                  <View style={{flexDirection: 'row'}}>
                    <Pressable onPress={telepon}>
                        <Image style={styles.aksi} source={Call}/>
                    </Pressable>
                    <Pressable onPress={sms}>
                        <Image style={styles.aksi} source={Chat}/>
                    </Pressable>
                  </View>
                ):(
                  <View/>
                )
                }
              </View>
        </View>
      
        <GarisBatas/>
              
        { alamat_pelanggan &&
        <View>
            <View style={styles.bagian}>
                <Text  style={styles.subjudul}>Alamat Tujuan</Text>
                <View style={{flexDirection:'row', alignItems:'center', width:'90%'}}>
                  < Image source={Location} style={styles.location} />
                    <Text>{alamat_pelanggan}</Text>
                </View>
                {catatan ?(
                  <View style={styles.catatan}>
                    <Text style={{fontWeight:'bold'}}>Catatan lokasi</Text>
                    <Text style={{fontStyle:'italic'}}>{catatan}</Text>
                  </View>
                ):(
                  <View style={styles.catatan}>
                    <Text style={{fontStyle:'italic'}}>Tanpa catatan lokasi...</Text>
                  </View>
                ) 
                }
            </View>
            <GarisBatas/>
        </View>
        }


        <View style={styles.bagian}>
          <View style={{marginBottom: height* 0.15}}>
            <Text  style={styles.subjudul}>Daftar Produk</Text>
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
                  <Text style={styles.subjudul}>Sub Total</Text>
                  <Text>Rp{hargasubtotal}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Biaya Layanan</Text>
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
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
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
      marginTop: 10,
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
    backgroundColor: Ijo,
    padding: 10,
    width: width * 0.3,
    borderRadius: 20,
    marginBottom: 10,
},

}) 