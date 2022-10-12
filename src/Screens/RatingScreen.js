import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, StatusBar, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Hitam, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigationState } from '@react-navigation/native';
import { kirimRating } from '../../API/firebasemethod';
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { app } from '../../Firebase/config';

const { height, width } = Dimensions.get('window')


const RatingScreen = ({ navigation, route }) => {

    const { 
        id_transaksi, id_mitra,
         } = route.params;

    const [ pilih, setPilih ] = useState();
    const [ nilai, setNilai ] = useState([1,2,3,4,5]);
    const [ ekspresi, setEkspresi ] = useState();

    const [ namatoko, setNamatoko ] = useState();
    const [ foto_akun, setFoto_akun ] = useState();

    const db = getFirestore(app)
    
    //Untuk mendapatkan foto dan nama mitra,
    useEffect(() => {
        async function getStatus(){
        const docRef = doc(db, "mitra", id_mitra);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setNamatoko(docSnap.data().namatoko)
            setFoto_akun(docSnap.data().foto_akun)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        };
        };
        getStatus();
    },[]);

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
                                <Ionicons name="star" size={40} color={Kuning} style={{marginHorizontal:5}}/>
                                ):(
                                <Ionicons name="star" size={40} color={Hitam} style={{marginHorizontal:5, opacity: 0.5}}/>
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

    const kirimNilai = () => {
        kirimRating(pilih, id_mitra, id_transaksi);
        Alert.alert('Nilai sudah masuk','Terima kasih atas penilaian anda.');
        navigation.replace('HomeScreen');
    };
    return (
        <View style={styles.latar}>
            <Image source={foto_akun} style={styles.foto}/>
            <Text style={styles.nama}>{namatoko}</Text>
            <Text style={{color: Putih, fontSize: 14, marginBottom: 10}}>
                Beri penilaian layanan mitra kali ini
            </Text>
            <NilaiBintang/>
            <Text style={styles.ekspresi}>{ekspresi}</Text>
       {  pilih &&   
            <TouchableOpacity style={styles.kirim} onPress={kirimNilai}>
                <Text style={{color: Putih, fontSize: 16, fontWeight:'bold', textAlign:'center'}}>Kirim</Text>
            </TouchableOpacity>
        }
        </View>
  )
}

export default RatingScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: IjoTua,
        justifyContent:'center',
        alignItems:'center',
    },
    foto:{
        width: width * 0.32,
        height: width * 0.32,
        backgroundColor: Putih,
        borderRadius: 10,
        borderColor: Ijo,
        borderWidth: 2,
        marginBottom: 10,
    },
    nama:{
        fontSize: 24,
        fontWeight:'bold',
        color: IjoMint,
        marginBottom: 5,
    },
    ekspresi:{
        fontSize: 18,
        color: Kuning,
        fontWeight:'bold',
    },
    kirim:{
        position:'absolute',
        backgroundColor: Ijo,
        padding: 10,
        width: width * 0.5,
        borderRadius: 20,
        bottom: height * 0.1,
    },
})