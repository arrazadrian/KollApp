import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { DPkartu } from '../assets/Image/Index.js'
import { Ijo } from '../Utils/Warna.js'

const ListMitra = () => {
  return (
    <TouchableOpacity>
        <View style={styles.card}>
            <Image source={DPkartu} style={styles.foto}/>
            <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Sayur Aa Anri </Text>
                <Text> 200m </Text>
                <View style={styles.nilai}>
                    <Text style={{color:'#FFF'}}> Nilai </Text>
                    <Text style={{color:'#FFF', fontWeight: 'bold', fontSize:13}}> 9,8 </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ListMitra

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        
    },
    foto:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        width: 96,
        height: 96,
        borderRadius: 15, 
    },
    nilai:{
      position:'absolute',
      left:200, 
      top: 30, 
      alignItems:'center',
      backgroundColor: Ijo,
      borderRadius: 15,
    }
})