import { Dimensions, Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { updateVoucher } from '../features/voucherSlice'
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from '../../Firebase/config';

const { width, height } = Dimensions.get('window')

const VoucherAktif = ({item, subtotalhargaKeranjang}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const db = getFirestore(app);

    const pilihVoucher = async (id_voucher) =>{
        const docRef = doc(db, "promosi", id_voucher);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            if( subtotalhargaKeranjang >= docSnap.data().minimal ){
                dispatch(updateVoucher({potongan:docSnap.data().potongan}));
                navigation.goBack();
            } else {
                Alert.alert('Tidak memenuhi syarat','Total belanja kamu masih di bawah syarat minimal.');
                console.log(subtotalhargaKeranjang)
            }
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    };

    return (
    <View style={styles.card}>
        <View style={styles.bagharga}>
            <Text style={{color: Ijo}}>Voucher {item.jenis_layanan}</Text>
            <Text style={styles.harga}>Rp{new Intl.NumberFormat('id-Id').format(item.potongan).toString()}</Text>
        </View>
        <View style={styles.bagmin}>
            <View style={{marginTop: 10}}>
                <Text style={styles.hargamin}>Minimal belanja</Text>
                <Text style={styles.deskripsi}>Rp{new Intl.NumberFormat('id-Id').format(item.minimal).toString()}</Text>
            </View>
            <Pressable style={styles.tombol} onPress={() => pilihVoucher(item.id)}>
                <Text style={{color:Putih, fontWeight:'bold'}}>Pakai</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default VoucherAktif

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        borderColor: Ijo,
        borderWidth: 1,
        marginHorizontal: 10,
        marginBottom: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection:'row',
        height: height * 0.15,
        alignItems:'center',
        marginVertical: 5,
    },
    harga:{
        fontSize: 30,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
    },
    deskripsi:{
        color: IjoTua,
        textAlign:'center',
    },
    bagharga:{
        flex: 4,
        padding: 10,
    },
    bagmin:{
        flex: 2,
        backgroundColor: IjoMint,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent:'center',
        alignItems:'center',
    },
    hargamin:{
        fontSize: 12,
        color: Ijo,
        fontWeight: 'bold',
        marginTop: -5,
        textAlign:'center',
    },
    tombol:{
        backgroundColor: Ijo,
        borderRadius: 5,
        padding: 5,
        alignItems:'center',
        width: '60%',
        marginBottom: 10,
        marginTop: 8,
    }
})