import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { KollLong } from '../assets/Images/Index';
import ListReceipt from '../Components/ListReceipt';
import moment from 'moment';
import localization from 'moment/locale/id';


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  moment.updateLocale('id', localization)

  const { 
    hargatotal, id_mitra, id_pelanggan, jenislayanan, id_transaksi,
    jumlah_kuantitas, namamitra, namapelanggan, produk, waktu
     } = route.params;

     const atasReceipt = () => {
      return(
        <View>
            <Image source={KollLong} style={styles.logo}/>
              <View style={{ flexDirection:'row', marginBottom: 10 }}>
                    <View style={{flex:1, alignItems:'center'}}>
                      <Text style={styles.subjudul}>Jenis Layanan</Text>
                      <Text>{jenislayanan}</Text>
                    </View>
                    <View style={{flex:1,  alignItems:'center'}}>
                      <Text style={styles.subjudul}>ID Transaksi</Text>
                      <Text>{id_transaksi}</Text>
                    </View>
              </View >
    
              <View style={{borderBottomWidth:1, borderColor: Ijo}}/>
    
              <View style={{ marginVertical: 10 }}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.subjudul}>Nama Mitra</Text>
                        <Text>{namamitra}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.subjudul}>Waktu</Text>
                        <Text>{moment(waktu.toDate()).calendar()}</Text>
                    </View>
              </View>
    
              <View style={{borderBottomWidth:1, borderColor: Ijo, marginBottom:10}}/>
              <Text  style={styles.subjudul}>Daftar Produk</Text>
        </View>
      )
    }
    
    const bawahReceipt = () => {
      return(
        <View>
        <View style={{borderBottomWidth:1, borderColor: Ijo, marginTop: 10}}/>
    
        <View style={{ marginVertical: 10 }}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Sub Total</Text>
                  <Text>?????</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Biaya Layanan</Text>
                  <Text>?????</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Total Harga</Text>
                  <Text style={styles.subjudul}>{hargatotal}</Text>
              </View>
        </View>
        </View>
      )
    }

  return (
    <View style={styles.latar}>
      <View style={styles.kertas}>
          <View style={{ marginVertical: 10 }}>
                <FlatList
                  data={produk}
                  renderItem= {({item}) => <ListReceipt item={item} />}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponent= {atasReceipt}
                  ListFooterComponent={bawahReceipt}
                  showsVerticalScrollIndicator={false}
                />
          </View>
      </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: IjoTua,
    flex: 1,
    padding: 20,
  },
  kertas:{
    backgroundColor: Kuning,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo:{
     width: width*0.3,
     height: height*0.1,
    alignSelf:'center'
  },
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
  }
}) 