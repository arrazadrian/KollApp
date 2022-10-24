import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { Dua_orang, Pin_gerobak, KategoriPre } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/id'

const { width, height } = Dimensions.get('window')


const RiwayatCard = ({ item }) => {

  moment.updateLocale('id', localization)

  const navigation = useNavigation()

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      hargalayanan: item?.hargalayanan,
      hargasubtotal: item?.hargasubtotal,
      hargatotalsemua: item?.hargatotalsemua,
      id_mitra: item.id_mitra,
      id_pelanngan: item.id_pelanngan,
      alamat_pelanggan: item?.alamat_pelanggan,
      catatan_lokasi: item?.catatan_lokasi,
      catatan_produk: item?.catatan_produk,
      pembayaran: item?.pembayaran,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item?.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      namapelanggan: item.namapelanggan,
      produk: item?.produk,
      waktu_selesai: item?.waktu_selesai,
      status_transaksi: item?.status_transaksi,
      id_transaksi: item.id,
      rating_layanan: item?.rating_layanan,
      rating_produk: item?.rating_produk,
    })
  }

  return (
    <View>
      <Pressable style={styles.card}
        onPress={pindahDetail}
      >
      <View>
        { item.jenislayanan == 'Temu Langsung' ? (
          <Image source={Dua_orang} style={styles.gambar} />      
          ): item.jenislayanan == 'Panggil Mitra' ? (
            <Image source={Pin_gerobak} style={styles.gambar} />      
          ) : (
            <Image source={KategoriPre} style={styles.gambar} />
          )
        }
      </View>
        <View>
          <Text
          style={{fontSize:18, fontWeight:'bold', color:IjoTua}}
          >
              {item.namatoko}
          </Text>
          <Text style={{fontSize:16, color:Ijo}}>
              <Text>Rp</Text>
              <Text>{item.hargatotalsemua}</Text>
              <Text> | </Text>
              <Text>{item.jumlah_kuantitas} </Text>
              <Text>Produk</Text>
          </Text>
          <View style={{flexDirection:'row'}}>
            <Text>{moment(item.waktu_selesai.toDate()).calendar()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default RiwayatCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginBottom: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
    gambar:{
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: 10,
        margin: 10,
        backgroundColor: IjoMint,
    }
})