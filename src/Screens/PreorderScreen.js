import {StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint } from '../Utils/Warna'
import PencarianBar from '../Components/PencarianBar'
import ListPreOrder from '../Components/ListPreOrder'
import { Bag, Bawah, KollLong } from '../assets/Image/Index.js';

const PreorderScreen = () => {
  return (
    <View style={styles.latar}>
      <ScrollView>
        <View style={{padding:10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', }}>
               <Image source={KollLong} style={{width: 80, height:50}} /> 
               <PencarianBar/>
            </View>
        <View style={styles.bungkus}>
            <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold',color: Ijo}}>Kapan Harus Pre-Order?</Text>
            <Text style={{textAlign:'center', fontSize: 16 }}>
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
        </View>
        <View>
            <Image source={Bawah} style={styles.bawah}/>
        </View>
      </ScrollView>
      
      <View style={{flexDirection:'column-reverse'}}>
          <View style={styles.pesan}>
            <View style={{flexDirection:'row'}}>
                <View style={{marginHorizontal: 10, justifyContent:'center'}}>
                  <Image source={Bag} style={{width:40, height:40}}/>
                </View>
                <View>
                  <Text style={{color:Putih, fontWeight:'bold'}}>
                      <Text>0 </Text>
                      <Text>Produk</Text>
                  </Text>
                  <Text style={{color:Putih, fontWeight:'bold', fontSize: 20}}>
                      <Text>Rp </Text>
                      <Text>0</Text>
                  </Text>
                </View>
            </View>
            <Pressable style={{backgroundColor: IjoTua, padding: 10, borderRadius: 10}}>
              <Text style={{color:Putih, fontWeight:'bold', fontSize: 18}}>Pesan</Text>
            </Pressable>
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
    backgroundColor: Ijo,
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    width: '95%',
    borderColor: IjoTua,
    borderWidth: 3,
    margin: 10
  },
  bawah:{
    width: '100%',
    height: 98,
  }
})