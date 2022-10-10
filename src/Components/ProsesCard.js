import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu, Gerobak, KategoriPre, TemuLangsung } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'

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
      catatan: item?.catatan,
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
      id_pelanngan: item.id_mitra,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      status_transaksi: item?.status_transaksi,
      waktu_selesai: item?.waktu_selesai,
      waktu_dipesan: item?.waktu_dipesan,
      catatan: item?.catatan,
      id_transaksi: item.id,
      panggilan: item.panggilan,
      estimasi_waktu: item.estimasi_waktu,
      jarak: item.jarak,
    })
  }
  return (
    <View>
      { item.jenislayanan == "Panggil Mitra" ? 
        (
        <Pressable style={styles.card}
        onPress={pindahOtw}
        >
        { item.jenislayanan == 'Temu Langsung' ? (
          <Image source={TemuLangsung} style={styles.foto} />      
          ): item.jenislayanan == 'Panggil Mitra' ? (
            <Image source={Gerobak} style={styles.foto} />      
          ) : (
            <Image source={KategoriPre} style={styles.foto} />
          )
        }
          <View>
            <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                {item.namatoko} 
            </Text>
            { item.panggilan == "Diterima" ? 
            (
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Sedang menuju lokasi kamu
            </Text>      
            ):(
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Sudah sampai lokasi kamu
            </Text>      
            ) 

            }
          </View>
        </Pressable>
        ):(
          <Pressable style={styles.card}
          onPress={pindahDetail}
          >
          { item.jenislayanan == 'Temu Langsung' ? (
            <Image source={TemuLangsung} style={styles.foto} />      
            ): item.jenislayanan == 'Panggil Mitra' ? (
              <Image source={Gerobak} style={styles.foto} />      
            ) : (
              <Image source={KategoriPre} style={styles.foto} />
            )
          }
            <View>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                  {item.namatoko}
              </Text>
              <View>
                <Text style={{fontSize:14, color:Ijo}}>
                    Pre-Order kamu dalam proses
                </Text>  
                <Text style={{fontSize:14, color:Ijo, fontWeight:'bold'}}>
                  Rp{item.hargatotalsemua} | {item.jumlah_kuantitas} produk
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
    },
    foto:{
        width: height * 0.12,
        height: height * 0.12,
        borderRadius: 10,
        margin: 10,
        backgroundColor: IjoMint,
    }
})