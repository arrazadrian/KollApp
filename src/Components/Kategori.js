import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { jeniskategori } from '../Data/jeniskategori'
import { Ijo, IjoMint, IjoTua, Putih} from '../Utils/Warna';
import { useDispatch } from 'react-redux';
import { updateKategori } from '../features/kategoriSlice';

const { height, width } = Dimensions.get('window')


const Kategori = () => {
    const[pilkategori, setPilkategori]= useState("Semua Produk")
    const dispatch = useDispatch();

    useEffect(() => {
        pilihKategori();
    }, [pilkategori]);


    const pilihKategori = () => {
      dispatch(updateKategori({pilkategori}));
      console.log("Kategori yg dipilih: " + pilkategori)
  };

  return (
    <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingStart: 10, paddingEnd: 10, marginTop: 10}}>
        {jeniskategori.map((item, index) => (
        <TouchableOpacity key={index}
            style={{backgroundColor: pilkategori == item.nama ? IjoMint : Putih, ...styles.kartuKategori}}
            onPress={() => setPilkategori(item.nama)}>
            <View style={ styles.kategoripilihan}>
                <Image source={item.image} style={styles.gambar} />
            </View>
            <Text style={{color: pilkategori == item.nama ? Ijo : IjoTua,...styles.nama}}>{item.nama}</Text>
        </TouchableOpacity>
        ))}
    </ScrollView> 
  )
}

export default Kategori

const styles = StyleSheet.create({
    nama:{
        fontSize: 14,
        fontWeight: 'bold',
        width: 60,
      },  
      gambar:{
        width: width*0.1,
        height: width*0.1,
      },
      kartuKategori:{
        flexDirection: 'row',
        alignSelf:'center',
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 50,
        justifyContent:'flex-start',
        alignItems:'center',
      },
      kategoripilihan:{
        alignItems:'center',
        padding: 5, 
        borderRadius: 50, 
        marginRight: 10,
        backgroundColor: Putih,
      },
})