import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.latar}>
         <View style={{alignItems:'center'}}>
           <Text style={{color: Putih, fontSize: 30, fontWeight:'bold'}}>Daftar Akun</Text>
           <Text style={{color: Putih, fontSize: 17}}>Yuk lengkapi data pribadimu!</Text>
         </View>
          <View style={styles.kotak}>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Nama Lengkap</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Nama Lengkap"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Email</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Email"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Password</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput secureTextEntry={true} style={styles.input} placeholder="Password"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Tulis Ulang Password</Text>
              </View>
              <View style={{marginBottom: 20}}>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Tulis Ulang Password"/>
              </View>
              <View style={{justifyContent: 'center'}}>
                  <Text style={{color: Putih, textAlign: 'center'}}>
                    <Text>Dengan mendaftar akun anda menyetujui </Text>
                    <Text style={{fontWeight:'bold'}}>kebijakan privasi </Text> 
                    <Text>dalam aplikasi ini</Text>
                  </Text>
              </View>
          </View>
            <Button title="Daftar" />
        <View style={{alignSelf:'center'}}>
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
    paddingVertical: 40
  },
  kotak:{
    top: 20,
    backgroundColor: Ijo,
    borderRadius: 20,
    width: 300,
    height: 500,
    alignSelf: 'center',
    opacity: 1,
    marginBottom: 50,
    paddingHorizontal: 26,
    paddingVertical: 20
  },
  input: {
    backgroundColor: Putih,
    height: 40,
    borderRadius: 10,
    paddingStart: 10
  },
})