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
                  <TextInput style={styles.input} placeholder="Asep Suryana"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Email</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="emailanda@mail.com"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>No. Handphone</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="08XXXXX"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Password</Text>
              </View>
              <View style={{marginBottom: 10}}>
                  <TextInput secureTextEntry={true} style={styles.input} placeholder="Kata Sandi"/>
              </View>
              <View style={{left: 5, marginBottom: 5}}>
                  <Text style={{color: Putih}}>Tulis Ulang Password</Text>
              </View>
              <View style={{marginBottom: 16}}>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Tulis Ulang Kata Sandi"/>
              </View>
              <View style={{justifyContent: 'center'}}>
                  <Text style={{color: Putih, textAlign: 'center'}}>
                    <Text>Dengan mendaftar akun anda menyetujui </Text>
                    <Text style={{fontWeight:'bold'}}>kebijakan privasi </Text> 
                    <Text>dalam aplikasi ini</Text>
                  </Text>
              </View>
          </View>
          <View style={styles.tombol}>
              <Text style={{fontWeight:'bold', fontSize: 20, color: Putih}}>Daftar</Text>
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 40
  },
  kotak:{
    top: 20,
    backgroundColor: Ijo,
    borderRadius: 20,
    width: 320,
    height: 455,
    alignSelf: 'center',
    opacity: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  input: {
    backgroundColor: Putih,
    height: 40,
    borderRadius: 10,
    paddingStart: 10
  },
  tombol:{
    width: 320,
    height: 50,
    backgroundColor: Ijo,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})