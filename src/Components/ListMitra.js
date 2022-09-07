import { StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import React from 'react'
import { DPkartu } from '../assets/Images/Index.js'
import { Abu, Ijo, IjoTua } from '../Utils/Warna.js'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const ListMitra = ({ item }) => {

  const navigation = useNavigation();

  return (
        <View style={styles.card}>
          <Image source={DPkartu} style={styles.foto}/>
					<View style={styles.deskripsi}>
            <View >
                <Text style={{fontSize: 20, fontWeight: 'bold', color:IjoTua}}>{item.namatoko}</Text>
                <Text> 200m | 20 menit</Text>
            </View>    
        	</View>
        </View>
  )
}

export default ListMitra

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 5,
        marginHorizontal: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Ijo,
        padding: 10,
    },
    foto:{
        width: height * 0.12,
        height: height * 0.12,
        borderRadius: 10, 
        marginRight: 10,
    },
    deskripsi:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
})