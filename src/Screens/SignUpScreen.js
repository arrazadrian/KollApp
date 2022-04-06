import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.latar}>
        <View style={styles.kotak}>
           
        </View>
        <View style={{alignSelf:'center', top: 170}}>
            <Text style={{color: Putih}}>
                <Text>Sudah punya akun?</Text>   
                <Text style={{fontWeight:'bold'}}
                onPress={() => navigation.navigate('SignInScreen')}
                > Klik ini!</Text>
            </Text>
        </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: IjoTua,
    paddingHorizontal: 20,
  },
  kotak:{
    top: 120,
    backgroundColor: Ijo,
    borderRadius: 20,
    width: 300,
    height: 500,
    alignSelf: 'center',
    opacity: 0.5,
  }
})