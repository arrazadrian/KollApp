import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SignIn, LatarSignIn } from '../assets/Image/Index'
import { Hitam, Ijo, Kuning, Putih } from '../Utils/Warna'
import { NavigationContainer } from '@react-navigation/native'
import { IconLock, IconMessage } from '../assets/Icon/Index'
import { useEffect, useState } from 'react'

const { height, width } = Dimensions.get('window')

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.latar}>
            <Image source={LatarSignIn} style={styles.gerobak} />
              <View>
                <Image source={SignIn} style={styles.pojoklogo} />
              </View>
              <View>
                  <View style={styles.wraper}>
                      <View style={{marginBottom: 10}}>
                          <Text style={styles.judul}>Masuk Akun</Text>
                          <Text style={{fontSize: 16}}>Lengkapi email dan kata sandi</Text>
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput style={styles.input} placeholder="Email akun anda" />
                          <IconMessage style={{position:'absolute', top: 14, left: 8}} />
                      </View>
                      <View style={{ marginBottom: 10}}>
                          <TextInput secureTextEntry={true} style={styles.input} placeholder="Kata sandi akun anda"/>
                      <IconLock style={{position:'absolute', top: 14, left: 8}}/>
                      </View>

                      <View style={styles.tombol}>
                        <Text style={{color: Putih, fontWeight: 'bold', textAlign:'center', fontSize: 20 }}>Masuk</Text>
                      </View>
                      <View style={{alignItems: 'center'}}>
                          <Text style={{color: Ijo, fontSize: 16}}>  
                              <Text>Belum punya akun? </Text>   
                              <Text style={{fontWeight:'bold'}}
                              onPress={() => navigation.navigate('SignUpScreen')}                      
                              >Klik ini!</Text>
                          </Text>
                      </View>
                  </View>
              </View>
          </View>
          </TouchableWithoutFeedback>
     
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,
    
  },
  gerobak:{
    flex:1,
    position:`absolute`,
    height: height,
    width: width,
  },
  pojoklogo: {
    width:  100,
    height: 50,
    top: 20,
    marginLeft: 10,
    marginTop: 10,
    position: `absolute`,
  
  },
  tombol:{
    height: 50,
    width: 300, 
    justifyContent: 'center', 
    marginVertical: 20, 
    backgroundColor: Ijo,
    borderRadius: 10,
    alignSelf: 'center'
   
  },
  judul: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: Hitam,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Ijo,
    height: 50,
    borderRadius: 10,
    paddingStart: 40,
    fontSize: 16,
  },
  wraper:{
    marginTop: 180,
    marginHorizontal: 30,
  }
})