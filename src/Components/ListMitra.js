import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { DPkartu } from '../assets/Image/Index.js'
import { Abu, Ijo } from '../Utils/Warna.js'

const ListMitra = ({navigation}) => {
  return (

        <View style={styles.card} onPress={() => navigation.navigate('DetailScreen')} >
            <FotoMitra/>
            <DeskMitra/>
        </View>
 
  )
}

export default ListMitra

const FotoMitra = () => {
    return (
        <Image source={DPkartu} style={styles.foto}/>
    )
}

const DeskMitra = () => {
    return (
        <View style={styles.deskripsi}>
            <View >
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sayur Aa Anri</Text>
                <Text> 200m | 20 menit</Text>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Ijo,
        padding: 10,
    },
    foto:{
        width: 100,
        height: 100,
        borderRadius: 10, 
        marginRight: 10,
    },
    deskripsi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    nilai:{
        height: 40,
        width: 40,
        backgroundColor: Abu,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})