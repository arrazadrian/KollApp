import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window')

const LokasiScreen = ({ route }) => {

    const navigation = useNavigation();

    const { 
        namatoko, foto_akun,
         } = route.params;

  return (
    <View>
        <MapView style={styles.peta}/>
        <View style={styles.bungkus}>
                <View style={styles.atas}>
                    <View>
                        <Image source={{uri: foto_akun}} style={styles.foto}/>
                    </View> 
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold'}}>{namatoko}</Text>
                        <Text>
                            <Text>200m</Text>
                            <Text> | </Text>
                            <Text>20 menit</Text>
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: IjoTua}}>Tujuan Lokasi</Text>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: Ijo, textDecorationLine:'underline'}}
                        onPress={() => navigation.navigate('FLocScreen')}
                        >Ubah</Text>
                    </View>
                        <Text style={{fontSize: 18, flexWrap:'wrap'}}>Jl. Menuju Skripsi No 1</Text>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 18, fontWeight:'bold', color: IjoTua}}>Beri catatan</Text>
                    <TextInput placeholder='Deskripsikan lokasi...' multiline={true} style={styles.input}/>
                </View>
                <Pressable style={styles.panggil}
                onPress={() => navigation.navigate('LoadingScreen')}
                >
                    <Text style={{fontSize: 18, color:Putih, fontWeight:'bold'}}>Panggil</Text>
                </Pressable>     
        </View>
        
    </View>
  )
}

export default LokasiScreen

const styles = StyleSheet.create({
    peta:{
        width: '100%',
        height: '50%',
      },
    bungkus:{
        width: '100%',
        height: '50%',
        backgroundColor: Kuning,
        padding: 20,
    },
    foto:{
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: Putih,
        borderRadius: 10,
        marginRight: 10,
    },
    atas:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input:{
        backgroundColor: Putih,
        fontSize: 16,
        borderRadius: 10,
        flexWrap: 'wrap',
        padding: 10,
        marginVertical: 5,
    },
    panggil:{
        backgroundColor: Ijo,
        borderRadius: 20,
        width: '100%',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    }
})