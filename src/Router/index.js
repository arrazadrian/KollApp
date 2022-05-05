import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  SplashScreen, 
  HomeScreen, 
  PembelianScreen, 
  RiwayatScreen, 
  AkunScreen, 
  SignInScreen,
  SignUpScreen,
  DetailScreen,
  KategoriScreen,
} from '../Screens/Index.js'
import TabNavigasi from '../Components/TabNavigasi.js';
import Kategori from '../Screens/KategoriScreen.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Gerbang = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const AppUtama = () =>{
    return(
        <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
            <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Riwayat" component={RiwayatScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Akun" component={AkunScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
};


const DalamMitra = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="KategoriScreen" component={KategoriScreen} />
    </Stack.Navigator>
  )
}

const Routernih = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Gerbang" component={Gerbang} options={{ headerShown: false }}/>
        <Stack.Screen name="AppUtama" component={AppUtama} options={{ headerShown: false }}/>
        <Stack.Screen name="DalamMitra" component={DalamMitra} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default Routernih

const styles = StyleSheet.create({})