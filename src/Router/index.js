import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SplashScreen, PembelianScreen, RiwayatScreen, AkunScreen } from '../Screens/Index.js'
import TabNavigasi from '../Components/TabNavigasi.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppUtama = () =>{
    return(
        <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
            <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Pembelian" component={PembelianScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Riwayat" component={RiwayatScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Akun" component={AkunScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
};

const Routernih = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AppUtama" component={AppUtama} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Routernih

const styles = StyleSheet.create({})