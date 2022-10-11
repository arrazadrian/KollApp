import { StyleSheet, Text, View, Image, ScrollView, Pressable, Dimensions, StatusBar, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Hitam, Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import Ionicons from '@expo/vector-icons/Ionicons';


const { height, width } = Dimensions.get('window')


const RatingScreen = () => {

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


    return (
        <View style={styles.latar}>
            <View style={styles.foto}/>
            <Text style={styles.nama}>Sayur Hijau Dramaga</Text>
            <Text style={{color: Putih, fontSize: 14, marginBottom: 10}}>
                Beri penilaian layanan mitra kali ini
            </Text>
            <NilaiBintang/>
            <Text style={styles.ekspresi}>{ekspresi}</Text>
            <TouchableOpacity style={styles.kirim}>
                <Text style={{color: Putih, fontSize: 16, fontWeight:'bold', textAlign:'center'}}>Kirim</Text>
            </TouchableOpacity>
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