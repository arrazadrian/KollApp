import { Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListMitra from '../Components/ListMitra'
import { Ijo, Kuning, Hitam, Putih, IjoTua } from '../Utils/Warna'
import { getFirestore, collection, query, where, getDocs, doc, orderBy, startAt, endAt } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useSelector } from 'react-redux';


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
                   namatoko, phone, status_sekarang, waktu_buka, waktu_tutup } = doc.data();
          list.push({
            id: doc.id,
            alamat, email, foto_akun, geo, geohash,
            id_mitra, mangkal, namalengkap, namatoko,
            phone, status_sekarang, waktu_buka, waktu_tutup,
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
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent=
          {
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}> 
              <Text>Maaf, layanan koll belum ada di daerah kamu</Text>
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
})