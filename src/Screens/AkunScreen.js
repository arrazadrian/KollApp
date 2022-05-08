import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih} from '../Utils/Warna';

const AkunScreen = () => {
  return (
    <SafeAreaView style={styles.latar}>
      <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center', marginBottom: 20}}>
                <View style={styles.foto}>
                  <Text>Putuu</Text>
                </View>
                <View>
                    <Text style={{fontSize: 30, fontWeight:'bold', color: Putih,}}>Arraz Adrian</Text>
                    <Text style={{fontSize: 18,color: Putih,}}>Pelanggan</Text>
                </View>
            </View>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1}}>
              <Text style={{color: Putih, fontSize: 30, fontWeight: 'bold'}}>Info</Text>
            </View>
            <View style={{padding: 10}}>
                <View style={{justifyContent:"space-between", flexDirection:'row', marginBottom: 10}}>     
                      <Text style={{color: Putih, fontSize: 20, fontWeight:'bold'}}>No.Handphone</Text> 
                      <Text style={{color: Putih, fontSize: 20}}>0909090909090</Text>   
                </View>
                <View style={{justifyContent:"space-between", flexDirection:'row', marginBottom: 10}}>     
                      <Text style={{color: Putih, fontSize: 20, fontWeight:'bold'}}>Email</Text> 
                      <Text style={{color: Putih, fontSize: 20}}>contoh@gmail.com</Text>   
                </View>
                <View style={{justifyContent:"space-between", flexDirection:'row', marginBottom: 10}}>     
                      <Text style={{color: Putih, fontSize: 20, fontWeight:'bold'}}>Alamat</Text> 
                      <Text style={{color: Putih, fontSize: 20}}>Jl.Contoh aja</Text>   
                </View>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  foto:{
    width: 100,
    height: 100,
    backgroundColor: Putih,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  container:{
    backgroundColor: IjoTua,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    top: 150, 
    padding: 20,
  },
  tulisan:{
    fontSize: 18,
    color: Putih,
  }
})