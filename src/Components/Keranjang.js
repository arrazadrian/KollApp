import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { AbuTua, Ijo, IjoTua, Putih } from '../Utils/Warna'
import { Bag } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice'
import "intl"
import "intl/locale-data/jsonp/id"

const Keranjang = (props) => {
  const items = useSelector(pilihProdukKeranjang)
  const navigation = useNavigation();
  const totalhargaKeranjang = useSelector(totalHarga)

  const pindahCheckout = () => {
    navigation.navigate('CheckoutScreen', { 
      id_mitra: props.id_mitra,
      namalengkap_mitra: props.namalengkap_mitra,
      namatoko: props.namatoko,
      phonemitra: props.phonemitra,
      geo_mangkal: props.geo_mangkal,
      token_notifmitra: props.token_notifmitra,
    })
  }

  return (
    <View>
      <View style={styles.pesan}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{marginHorizontal: 10, justifyContent:'center'}}>
                      <Image source={Bag} style={{width:40, height:40}}/>
                    </View>
                    <View>
                      <Text style={{color:Putih, fontWeight:'bold'}}>
                          <Text>{items.length}</Text>
                          <Text>  </Text>
                          <Text>Produk</Text>
                      </Text>
                      <Text style={{color:Putih, fontWeight:'bold', fontSize: 20}}>
                          <Text>Rp </Text>
                          <Text>{new Intl.NumberFormat('id-Id').format(totalhargaKeranjang).toString()}</Text>
                      </Text>
                    </View>
                  </View>
                  { !items.length ?
                    (
                      <View style={{width: 120}}>
                        <Text style={{fontStyle:'italic', color: Putih}}>
                          Pilih produk kamu
                        </Text>
                      </View>
                    ):(
                      <Pressable 
                        disabled={!items.length}
                        style={{backgroundColor: IjoTua, padding: 10, borderRadius: 10}} 
                        onPress={pindahCheckout}
                        >
                        <Text style={{color:Putih, fontWeight:'bold', fontSize: 18}}>Checkout</Text>
                      </Pressable>
                    )
                  }
                  
            </View>
    </View>
  )
}

export default Keranjang

const styles = StyleSheet.create({
    pesan:{
        flexDirection: 'row',
        backgroundColor: Ijo,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        width: '95%',
        borderColor: IjoTua,
        borderWidth: 1,
        bottom:20,
      },
})