import { Image, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'
import { Tiba, Perjalanan, Load1, Load2, Load3 } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../../Firebase/config';



const { height, width } = Dimensions.get('window')

const OtwScreen = ({ navigation, route }) => {

  const db = getFirestore(app)

  // const [panggilan, setPanggilan] = useState("Diterima")
  
  const [namatoko, setNamatoko] = useState();
  const [phonemitra, setPhonemitra] = useState();
  const [alamat_pelanggan, setAlamat_pelanggan] = useState();
  const [estimasi_waktu, setEstimasi_waktu] = useState();
  const [jarak, setJarak] = useState();

  const telepon = () => {
    Linking.openURL(`tel:${phonemitra}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonemitra}`);
  };

  // const { 
  //   id_transaksi
  //    } = route.params;

  //   useEffect(() =>{ 
  //   async function getPanggilan(){
  //     try{
  //       const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
  //       setPanggilan(doc.data().panggilan);
  //       console.log('getPanggilan jalan (Home Screen)')
  //         // Respond to data
  //         // ...
  //       });
  //       //unsubscribe();
  //     } catch (err){
  //       Alert.alert('There is an error.', err.message)
  //     }
  //   }
  //   getPanggilan();
  // },[panggilan])

    useEffect(() =>{ 
    async function getDetailTransaksi(){
      const docRef = doc(db, "transaksi", id_transaksi);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setNamatoko(docSnap.data().namatoko);
        setPhonemitra(docSnap.data().phonemitra);
        setAlamat_pelanggan(docSnap.data().alamat_pelanggan);
        setEstimasi_waktu(docSnap.data().estimasi_waktu);
        setJarak(docSnap.data().jarak);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getDetailTransaksi();
  },[])


  return (
    <View style={styles.latar}>
        <View>
          <Image source={Perjalanan} style={styles.gambar}/>
          <Image source={Load1} style={styles.load}/>
          <Text style={styles.tulisan}>Mitra sedang menuju lokasi kamu</Text>
          <Text style={styles.tulisan}>Estimasi sampai {estimasi_waktu} dalam jarak {jarak}</Text>
        </View>
      {/* { panggilan == "Diterima" ? (
        <View>
          <Image source={Perjalanan} style={styles.gambar}/>
          <Image source={Load1} style={styles.load}/>
          <Text style={styles.tulisan}>Mitra sedang menuju lokasi kamu</Text>
        </View>
        ): panggilan == "Sudah Sampai" ? (
        <View>
          <Image source={Tiba} style={styles.gambar}/>
          <Image source={Load2} style={styles.load}/>
          <Text style={styles.tulisan}>Mitra sudah sampai lokasi kamu, yuk belanja!</Text>
        </View>
        ) : (
          <View>
            <Image source={Perjalanan} style={styles.gambar}/>
            <Image source={Load3} style={styles.load}/>
            <Text style={styles.tulisan}>Terima kasih sudah berbelanja bersama kami</Text>
          </View>
        )
      } */}

      <View style={styles.bungkus}>
        <View style={{ flexDirection:'row', marginBottom: 10, alignItems:'center' }}>
            <View style={{flex: 2}}>
              <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}} numberOfLines={1}>
                {namatoko}
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
        <GarisBatas/>
        <View style={{marginBottom: 20}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:IjoTua}}>Tujuan Lokasi</Text>
            <Text numberOfLines={3}>{alamat_pelanggan}</Text>
        </View>

        {/* { panggilan == "Diterima" &&
          <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textDecorationLine:'underline', textAlign:'center'}}
          
          >
            Batalkan Pesanan
          </Text>
        } */}
          <Text style={{fontSize:16, fontWeight:'bold', color:Ijo, textDecorationLine:'underline', textAlign:'center'}}
          
          >
            Batalkan Pesanan
          </Text>
      </View>
      <Pressable style={styles.kembali} onPress={()=> navigation.navigate('HomeScreen')}>
            <Ionicons name="chevron-back-circle-outline" size={40} color={Putih} />
        </Pressable>
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
      width: width * 0.9,
      height: height * 0.28,
      alignSelf:'center',
      marginBottom: 20,
      marginTop: height * 0.17,
      borderRadius: 10,
    },
    load:{
      width: width * 0.6,
      height: height * 0.1,
      alignSelf:'center',
      marginBottom: 10,
      borderRadius: 10,
    },
    tulisan:{
      color: Putih,
      textAlign:'center',
      fontSize: 16,
    },
    kembali:{
      borderRadius: 20,
      position:'absolute',
      top: height * 0.08,
      left: width * 0.05,
      justifyContent:'center',
      alignItems:'center',
    },
})