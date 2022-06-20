import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Location } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window')

const CheckoutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.latar}>
      <MapView style={styles.peta}/>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.judul}>Lokasi Antar</Text>
        <Text style={{fontSize: 18, fontWeight:'bold', color: Ijo, textDecorationLine:'underline'}}
            onPress={() => navigation.navigate('FLocScreen')}
            >Ubah</Text>
      </View>
      <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
        <Image source={Location} style={styles.location} />
        <Text style={styles.deskripsi}>Jl. Skripsi Cepat Lulus No.1</Text>
      </View>
      <TextInput 
            style={styles.input} 
            placeholder='Beri catatan lokasi...'
            multiline={true}
      />
      <Text style={styles.judul}>Jenis Layanan</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>Pre-Order</Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>2000</Text>
        </Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>Jasa Aplikasi</Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>1000</Text>
        </Text>
      </View>
      <Text style={styles.judul}>Deskripsi Pesanan</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>
            <Text>2x         </Text>
            <Text>Ikan Mujair</Text>
        </Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>24000</Text>
        </Text>
      </View>
      <View style={styles.total}>
            <Text style={styles.judul}>Total Harga:</Text>
            <Text style={styles.judul}>
                <Text>Rp</Text>
                <Text>27000</Text>
            </Text>
      </View>
      <Pressable style={styles.pesan}>
          <Text style={{color:Ijo, fontSize:20, fontWeight:'bold', textAlign:'center'}}>Pesan</Text>
      </Pressable>
    </ScrollView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        padding: 20,
    },
    peta:{
        width: '100%',
        height: height*(1/5),
        borderRadius: 20,
        marginBottom: 10,
    },
    judul:{
        fontSize: 20,
        color: IjoTua,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deskripsi:{
        fontSize: 18,
        color: IjoTua,
    },
    deskripsiPut:{
        fontSize: 18,
        color: Putih,
    },
    harga:{
        fontSize: 18,
        color: IjoTua,
        fontWeight: 'bold',
    },
    location:{
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input:{
        backgroundColor: Putih,
        marginBottom: 10,
        padding: 8,
        borderRadius: 10,
        fontSize: 18,
    },
    total:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 10,
        borderTopColor: IjoTua,
        borderTopWidth: 3,

    },
    pesan:{
        marginVertical: 20,
        borderWidth: 3,
        borderColor: Ijo,
        borderRadius: 20,
        padding: 10,
    }
})