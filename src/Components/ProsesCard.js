import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu, Gerobak, KategoriPre, TemuLangsung } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')


const ProsesCard = ({ item }) => {

  const navigation = useNavigation();

  return (
    
    <Pressable style={styles.card}>
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
            Sayur Aa Anri
        </Text>

      {/* { item.jenislayanan == 'Panggil Mitra' ? (
          <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
              Sedang menuju lokasi kamu
          </Text>      
        ):(
          <View>
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Pre-Order kamu akan disiapkan disiapkan
            </Text>  
            <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
                Tanggal sampai: 8 Februari 2022
            </Text>  
          </View>
        )
      } */}

        <Text style={{fontSize:16, fontWeight:'bold', color:Ijo}}>
            Sedang menuju lokasi kamu
        </Text>
      </View>
    </Pressable>
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