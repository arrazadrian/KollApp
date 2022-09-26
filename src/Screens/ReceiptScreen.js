import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { KollLong } from '../assets/Images/Index';
import ListReceipt from '../Components/ListReceipt';
import moment from 'moment';
import localization from 'moment/locale/id';
import GarisBatas from '../Components/GarisBatas';


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  moment.updateLocale('id', localization)

  const { 
    hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
    jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu_selesai, 
     } = route.params;

  return (
    <View style={styles.latar}>
        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', marginBottom: 10}}>
          <View>
              <Image source={KollLong} style={styles.logo}/>
          </View>
          <View>
              <Text style={{color: IjoTua, fontSize: 16, fontWeight: 'bold', marginBottom: -5}}>
                Nama Toko
              </Text>
              <Text style={{color: Ijo, fontSize: 18, fontWeight: 'bold'}}>
                {namatoko}
              </Text>
          </View>
        </View>
        <View style={styles.bagian}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>Jenis Layanan</Text>
                <Text>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>ID Transaksi</Text>
                <Text>{id_transaksi}</Text>
            </View>
        </View>

        <GarisBatas/>
    
        <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Nama Mitra</Text>
                  <Text>{namamitra}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Waktu Transaksi</Text>
                  <Text>{moment(waktu_selesai.toDate()).calendar()}</Text>
              </View>
        </View>
    
      <GarisBatas/>
      <View style={[styles.bagian, {paddingVertical: 0, marginVertical: 10, height: height* 0.45}]}>
        <Text  style={styles.subjudul}>Daftar Produk</Text>
        <ScrollView>
          {Object.entries(produk).map(([key, items]) => (
              <View key={key}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.deskripsi}>
                        <Text>{items.length}x   </Text>
                        <Text>{items[0]?.namaproduk}</Text>
                    </Text>
                    <Text style={styles.harga}>
                        <Text>Rp</Text>
                        <Text>{items[0]?.harga * items.length}</Text>
                    </Text>
                </View>
              </View>
          ))}
        </ScrollView>
      </View>
        <View style={styles.bawah}>
            <GarisBatas/>
            <View style={styles.bagian}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Sub Total</Text>
                    <Text>{hargasubtotal}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Biaya Layanan</Text>
                    <Text>{hargalayanan}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Total Harga</Text>
                    <Text style={styles.subjudul}>{hargatotalsemua}</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: Kuning,
    paddingTop: 20,
  },
  logo:{
     width: width*0.29,
     height: height*0.06,
     marginRight: 10,
  },
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  harga:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
  },
  bawah:{
    position:'absolute',
    width: width,
    bottom: 0,
    backgroundColor:IjoMint,
    paddingBottom: 10,
  },
  bagian:{
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
}) 