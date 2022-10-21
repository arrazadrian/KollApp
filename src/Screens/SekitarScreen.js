import { Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListMitra from '../Components/ListMitra'
import { Ijo, Kuning, Hitam, Putih, IjoTua, IjoMint } from '../Utils/Warna'
import { getFirestore, collection, query, where, getDocs, doc, orderBy, startAt, endAt } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useSelector } from 'react-redux';
import { noMitra } from '../assets/Images/Index';


const { height, width } = Dimensions.get('window')

const SekitarScreen = ({ navigation }) => {

  const[sekitar, setSekitar] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const { geo, alamat, geohash } = useSelector(state => state.posisi);
  const geofire = require('geofire-common');

  useEffect(()=>{
    const fetchSekitar = async() => {
      try{
        const list = []; 
        const lokasi_pelanggan = [geo.lat, geo.lng];
        const radiusInM = 1 * 1000;

        const db = getFirestore(app);
        const colRef = collection(db, "mitra");

        const bounds = geofire.geohashQueryBounds(lokasi_pelanggan, radiusInM);
        for (const b of bounds) {
          const q = query(
            collection(db, "mitra"),
            orderBy("geohash"),
            startAt(b[0]),
            endAt(b[1])
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          const { alamat, email, foto_akun, geo, geohash, id_mitra, mangkal, namalengkap,
                   namatoko, phone, status_sekarang, waktu_buka, waktu_tutup, rating_layanan, rating_produk } = doc.data();
          list.push({
            id_mitra: doc.id,
            alamat, email, foto_akun, geo, geohash,
            id_mitra, mangkal, namalengkap, namatoko,
            phone, status_sekarang, waktu_buka, waktu_tutup,
            rating_layanan, rating_produk,
            });
          });
        };

          if (componentMounted.current){ // (5) is component still mounted?
            setSekitar(list); // (1) write data to state
            setLoading(false); // (2) write some value to state
          }
          return () => { // This code runs when component is unmounted
              componentMounted.current = false; // (4) set it to false when we leave the page
          }

        } catch(err){
        console.log(err);
        }
    }
    fetchSekitar();
  },[])

  return (
    <View style={styles.latar}>
     {loading ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:80}} 
            data={sekitar}
            renderItem= {({item}) => <ListMitra item={item} />}
            keyExtractor={(item) => item.id_mitra}
            ListFooterComponent={<View style={{height:10}}></View>}
            ListHeaderComponent={<View style={{height:10}}></View>}
            ListEmptyComponent=
            {
              <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}> 
                <Image source={noMitra} style={styles.kosong}/>
                <Text style={styles.maaf}>Mohon maaf, layanan Koll belum ada di daerah kamu</Text>
              </View> 
            } 
        />
      )}
    </View>
  )
}

export default SekitarScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  kosong:{
    height: height * 0.25,
    width: width * 0.9,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: height * 0.2,
  },
  maaf:{
    color: Ijo, 
    fontWeight:'bold',
    textAlign:'center',
    paddingHorizontal: 20,
    fontSize: 16,
  },
})