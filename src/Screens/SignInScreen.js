import { StyleSheet, Text, View, Image, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import { SignIn } from '../assets/Image/Index'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { NavigationContainer } from '@react-navigation/native'

const SignInScreen = ({navigation}) => {
  return (
    <View>
      <View>
        <Image source={SignIn} style={styles.gambar} />
      </View>
      <View style={styles.form}>
          <View style={styles.wraper}>
              <Text style={styles.judul}>Masuk</Text>
              <View style={{ marginBottom: 7}}>
                  <Text style={styles.tulisan}>Email</Text>
              </View>
              <View style={{ marginBottom: 10}}>
                  <TextInput style={styles.input} placeholder="Email akun anda" />
              </View>
              <View style={{ marginBottom: 7}}>
                  <Text style={styles.tulisan}>Password</Text>
              </View>
              <View style={{ marginBottom: 10}}>
                  <TextInput secureTextEntry={true} style={styles.input} placeholder="Kata sandi akun anda" />
              </View>
              <View style={{width: 300, alignSelf:'center', marginVertical: 20}}>
                  <Button title="Masuk" color={Ijo}/>
              </View>
              <View style={{alignItems: 'center', top: 30}}>
                  <Text style={{color: Putih}}>  
                      <Text>Belum punya akun?</Text>   
                      <Text style={{fontWeight:'bold'}}
                      onPress={() => navigation.navigate('SignUpScreen')}
                      
                      >Klik ini!</Text>
                  </Text>
              </View>
          </View>
      </View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Putih ,
    borderTopLeftRadius: 50,
  },
  gambar: {
    width: '100%',
    height: 330,
    position: 'relative',
  },
  form:{
    top: 300,
    height: 500,
    width: '100%',
    backgroundColor: IjoTua,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
  },
  judul: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: Putih,
    marginBottom: 10,
  },
  tulisan: {
    fontSize: 15,
    color: Putih,
  },
  input: {
    backgroundColor: Putih,
    height: 40,
    borderRadius: 10,
    paddingStart: 30
  },
  wraper:{
    top: 30,
    marginHorizontal: 40,
  }
})