import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { DPkartu } from '../assets/Image/Index.js'
import { Abu } from '../Utils/Warna.js'

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
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Sayur Aa Anri </Text>
                <Text> 200m </Text>
            </View>    
            <View style={styles.nilai}>
            <Text>9.0</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    foto:{
        width: '100%',
        height: 180,
        borderRadius: 10, 
        marginBottom: 10,
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