import { StyleSheet, View, ActivityIndicator, Alert, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ijo, Kuning, Putih } from '../Utils/Warna'
import { app } from '../../Firebase/config'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { handleSignOut } from '../../API/firebasemethod'
import { useNavigation } from '@react-navigation/native'
import { Blokir } from '../assets/Images/Index.js';

const { height, width } = Dimensions.get('window')

const Peringatan = () => {
    return(
        <View>
            <Text style={styles.judul}>
               Maaf Akun Anda Kami Blokir 
            </Text>
            <Image source={Blokir} style={styles.gambar}/>
            <Text style={styles.tulisan}>
                Akun anda sedang <Text style={{fontWeight:'bold'}}>diblokir</Text> karena ada aktivitas mencurigakan. Silahkan hubungi layanan pelanggan Koll untuk aktivasi.
            </Text>
            <TouchableOpacity style={styles.tombol} onPress={handleSignOut}>
                <Text style={styles.keluar}>Keluar</Text>
            </TouchableOpacity>
        </View>
    )
}

const ScreeningScreen = () => {

    const [akun, setAkun] = useState(null);

    const navigation = useNavigation();
    useEffect(()=>{
        let unmounted = false
        const getData = () =>{
            const auth = getAuth();
            const db = getFirestore(app);
            
            const docrefakun = doc(db, "pelanggan", auth.currentUser.uid);
            getDoc(docrefakun).then(docSnap => {
                if (docSnap.exists()) {
                    setAkun(docSnap.data().akun)
                } else {
                    handleSignOut()
                    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
                }
            })
        }

       if(!unmounted){
           setTimeout(getData, 3000)
       }

       return() =>{ 
        unmounted = true
        console.log('get data cleared')
       }
    },[])

    useEffect(() => {
        let unmounted = false;
        getAkun = () => {
            console.log("AKUN = " + akun)
            if(akun == "Aktif"){
                navigation.replace("HomeScreen")
            }
        } 

        if(!unmounted){
            getAkun()
        }

        return() =>{ 
            unmounted = true
            console.log('get akun cleared')
           }
    },[akun])

  return (
    <View style={styles.latar}>
        { !akun || akun == "Aktif" ?
            <ActivityIndicator  size="large" color={Ijo}/> : <Peringatan/>
        }
    </View>
  )
}

export default ScreeningScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    gambar:{
        height: height*0.25,
        width: width * 0.8,
        borderRadius: 10,
        marginBottom: 10,
    },
    tulisan:{
        textAlign:'center',
        width: width * 0.8,
        fontSize: 14,
        color: Ijo,
        marginBottom: 50,
    },
    judul:{
        textAlign:'center',
        width: width * 0.8,
        fontSize: 20,
        color: Ijo,
        marginBottom: 10,
        fontWeight:'bold',
    },
    keluar:{
        textAlign:'center',
        fontSize: 18,
        color: Putih,
        fontWeight:'bold',
    },
    tombol:{
        borderRadius: 20,
        backgroundColor: Ijo,
        padding: 8,
    }
})