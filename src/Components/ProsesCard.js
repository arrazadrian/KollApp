import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { KategoriPre, Pin_gerobak } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import "intl"
import "intl/locale-data/jsonp/id"

const { width, height } = Dimensions.get('window')


const ProsesCard = ({ item }) => {

  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      alamat_pelanggan: item?.alamat_pelanggan,
      hargalayanan: item.hargalayanan,
      hargasubtotal: item.hargasubtotal,
      hargatotalsemua: item.hargatotalsemua,
      id_mitra: item.id_mitra,
      id_pelanngan: item.id_mitra,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      namapelanggan: item.namapelanggan,
      produk: item.produk,
      status_transaksi: item.status_transaksi,
      waktu_selesai: item?.waktu_selesai,
      waktu_dipesan: item?.waktu_dipesan,
      catatan_lokasi: item?.catatan_lokasi,
      catatan_produk: item?.catatan_produk,
      potongan: item.potongan,
      pembayaran: item?.pembayaran,
      phonemitra: item.phonemitra, 
      phonepelanggan: item.phonepelanggan,
      id_transaksi: item.id,
    })
  }

  const pindahOtw = () => {
    navigation.navigate('OtwScreen', { 
      alamat_pelanggan: item.alamat_pelanggan,
      geo_alamat: item.geo_alamat,
      id_mitra: item.id_mitra,
      id_pelanngan: item.id_pelanngan,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item?.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      status_transaksi: item?.status_transaksi,
      waktu_selesai: item?.waktu_selesai,
      waktu_dipesan: item?.waktu_dipesan,
      catatan_lokasi: item?.catatan_lokasi,
      id_transaksi: item.id,
      panggilan: item.panggilan,
      estimasi_waktu: item.estimasi_waktu,
      jarak: item.jarak,
    })
  }

  const GambarKartuProses = () => {
    return(
      <View>
        { item.jenislayanan == 'Panggil Mitra' ? (
            <Image source={Pin_gerobak} style={styles.foto} />      
          ) : (
            <Image source={KategoriPre} style={styles.foto} />
          )
        }
      </View>
    )
  };

  const StatusKartuProses = () => {
    return(
      <View>
         { item.panggilan == "Diterima" ? 
            (
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Sedang menuju lokasi kamu
            </Text>      
            ): item.panggilan == "Sudah Sampai" ?  (
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Sudah sampai lokasi kamu
            </Text>      
            ):(
              <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Menunggu respon mitra
               </Text>  
            )
          }
      </View>
    )
  };

  return (
    <View>
      { item.jenislayanan == "Panggil Mitra" ? 
        (
        <Pressable style={styles.card} onPress={pindahOtw}>
          <GambarKartuProses/>
          <View>
            <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                {item.namatoko} 
            </Text>
           <StatusKartuProses/>
          </View>
        </Pressable>
        ):(
          <Pressable style={styles.card}
          onPress={pindahDetail}
          >
            <Image source={KategoriPre} style={styles.foto} />
            <View>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                  {item.namatoko}
              </Text>
              <View>
                <Text style={{fontSize:14, color:Ijo}}>
                    Pre-Order kamu dalam proses
                </Text>  
                <Text style={{fontSize:14, color:Ijo, fontWeight:'bold'}}>
                  Rp{new Intl.NumberFormat('id-Id').format(item.hargatotalsemua).toString()} | {item.jumlah_kuantitas} produk
                </Text>  
              </View>
            </View>
          </Pressable>
        )
      }
    </View>
  )
}

export default ProsesCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
    },
    foto:{
        width: height * 0.1,
        height: height * 0.1,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: IjoMint,
        alignItems:'center',
        justifyContent:'center',
    }
})