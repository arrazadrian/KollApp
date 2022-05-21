import {StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna'
import PencarianBar from '../Components/PencarianBar'
import ListPreOrder from '../Components/ListPreOrder'
import { IconPembelianPutih } from '../assets/Icon/Index.js'

const PreorderScreen = ({ navigation }) => {
  return (
    <View> 
      <ScrollView style={styles.latar}>
        <View style={styles.bungkus}>
            <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold',color: Ijo}}>Kapan Harus Pre-Order?</Text>
            <Text style={{textAlign:'center'}}>
              Pre-Order yang dilakukan setelah pukul 18.00 WIB akan 
              dikirim lusa. Sementara Pre-Order yang dipesan sebelum 
              waktu tersebut akan dikirim keesokan harinya.
            </Text>
        </View>
        <View style={{marginBottom:10, marginLeft: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Produk Pre-Order</Text>
        </View>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
             <ListPreOrder/>
             <ListPreOrder/>
             <ListPreOrder/>
             <ListPreOrder/>
             <ListPreOrder/>
        </View>
      </ScrollView>
      <View style={{flexDirection: 'column-reverse'}}>
              <View style={styles.pesan}>
                <View>
                  <IconPembelianPutih/>
                </View>
                <View>
                  <Text>
                    <Text>0 </Text><Text>Produk</Text> 
                  </Text>
                  <Text>
                    <Text>Rp</Text><Text>0</Text>
                  </Text>
                </View>
              </View>
      </View>
    </View>
  )
}

export default PreorderScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    paddingHorizontal: 10
  },
  bungkus:{
    backgroundColor: IjoMint,
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  input:{
    backgroundColor: Putih,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    fontSize: 18,
    flexWrap: 'wrap',
  },
  judulisi:{
    fontSize: 16,
    color: IjoTua,
  },
  pesan:{
    flexDirection: 'row',
    backgroundColor: IjoMint,
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    width: '95%',
    borderColor: Ijo,
    borderWidth: 3,
    margin: 10
  },
})