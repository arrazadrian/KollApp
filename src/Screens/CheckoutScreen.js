import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Abu, Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Location } from '../assets/Images/Index'
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window')

const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <ScrollView>
        <View style={styles.lokasi}>
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
            <MapView style={styles.peta}/>
            <TextInput 
                  style={styles.input} 
                  placeholder='Beri catatan lokasi...'
                  multiline={true}
            />
        </View>

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
      </ScrollView>
        <View style={styles.simpulan}>
          <View style={styles.total}>
                <Text style={styles.judul}>Total Harga:</Text>
                <Text style={styles.judul}>
                    <Text>Rp</Text>
                    <Text>27000</Text>
                </Text>
          </View>
          <Pressable style={styles.pesan}>
              <Text style={{color: Putih, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Pesan</Text>
          </Pressable>
        </View>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        padding: 10,
    },
    lokasi:{
        padding: 15,
        backgroundColor: Putih,
        borderRadius: 10,
    },  
    peta:{
        width: '100%',
        height: height*(1/6),
        borderRadius: 20,
        marginBottom: 10,
    },
    judul:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deskripsi:{
        fontSize: 16,
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
        backgroundColor: Abu,
        padding: 8,
        borderRadius: 10,
        fontSize: 16,
    },
    total:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    pesan:{
        marginTop: 8,
        borderWidth: 2,
        borderColor: Ijo,
        borderRadius: 20,
        width: width * 0.9,
        height: height * 0.06,
        justifyContent:'center',
        backgroundColor: Ijo,
    },
    simpulan:{
        padding: 20,
        position:'absolute',
        width: width,
        height: height * 0.16,
        backgroundColor: Putih,
        bottom: 0,
    },
})