import { Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListMitra from '../Components/ListMitra'
import { Ijo, Kuning, Hitam, Putih, IjoTua } from '../Utils/Warna'
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';


const SekitarScreen = ({ navigation }) => {

  const[sekitar, setSekitar] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchSekitar = async() => {
      try{
        const list = []; 
        const db = getFirestore(app);
        const colRef = collection(db, "mitra")

        const q = query(colRef, where("status_sekarang", "==", "Tidak Aktif"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { 
            email, foto_akun, id_mitra, namalengkap, namatoko, phone, status_sekarang, tempat_mangkal, mangkal, 
          } = doc.data();
          list.push({
            id: doc.id,
            id_mitra,
            email,
            foto_akun,
            namalengkap,
            namatoko,
            phone,
            status_sekarang,
            tempat_mangkal,
            mangkal,
          });
        });

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
              <Text>Saat ini tidak ada mitra aktif di sekitar kamu</Text>
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