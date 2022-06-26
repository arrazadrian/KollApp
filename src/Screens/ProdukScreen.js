import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah, KollLong, KategoriPre} from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import ListProduk from '../Components/ListProduk'
import PanggilMitra from '../Components/PanggilMitra'

headerList = () => {
    return(
      <View style={{padding: 10}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', }}>
        <Image source={KollLong} style={{width: 80, height:50}} /> 
        <PencarianBar/>
      </View>
      <View style={{marginBottom:10, marginLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Kategori</Text>
      </View>
  
      <FlatList
          numColumns={3}
          data={jeniskategori}
          renderItem= {({item}) => <LogoKategori item={item} />}
          keyExtractor={ jeniskategori => jeniskategori.id}
          ListFooterComponent ={
            <View>
                <View style={{paddingHorizontal: 10, paddingVertical:10}}> 
                 <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>
                    Tidak menemukan produk?
                  </Text>
                </View>  
                <Pressable style={styles.preorder} onPress={() => navigation.push('PreorderScreen')}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Pre-Order</Text>
                        <Text>Lihat produk pre-order yang bisa dipesan</Text>
                    </View>
                    <Image source={KategoriPre} style={styles.gambar} />
                </Pressable>
            </View>
          }
      />
  
      <View style={{marginBottom:10, marginLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Daftar Produk</Text>
      </View>
    </View>
    )
  }

const ProdukScreen = () => {
    return (
        <View style={styles.latar}>
                    <View>
                      <FlatList
                          numColumns={3}
                          data={daftarproduk}
                          renderItem= {({item}) => <ListProduk item={item} />}
                          keyExtractor={ daftarproduk => daftarproduk.id}
                          ListHeaderComponent={headerList}
                          ListEmptyComponent={<Text>Produk utama masih kosong</Text>}
                          ListFooterComponent={
                          <View>
                            <Image source={Bawah} style={styles.bawah}/>
                          </View>
                          }
                      />
                    </View>
                
              
              <View style={{flexDirection: 'column-reverse'}}>
                  <PanggilMitra/>
              </View>
        </View>
      )
}

export default ProdukScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
      },
      panggil:{
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
      preorder:{
        flexDirection: 'row',
        backgroundColor: Putih,
        borderRadius: 10,
        height: 100,
        padding: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: Ijo,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
      },
      bawah:{
        width: '100%',
        height: 98,
      },
      gambar:{
        height: 95,
        width: 95,
      }
})