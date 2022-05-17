import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  SplashScreen, 
  HomeScreen,
  SekitarScreen, 
  PosisiScreen,
  LangsungScreen,
  PembelianScreen, 
  RiwayatScreen, 
  AkunScreen, 
  SignInScreen,
  SignUpScreen,
  KategoriScreen,
  EditScreen,
} from '../Screens/Index.js'
import TabNavigasi from '../Components/TabNavigasi.js';
import Kategori from '../Screens/KategoriScreen.js';
import { Ijo, Putih } from '../Utils/Warna.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiwayatStack = createNativeStackNavigator();
const AkunStack = createNativeStackNavigator();

const AppUtama = () =>{
  return(
      <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
          <Tab.Screen name="Beranda" component={HomeStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Riwayat" component={RiwayatStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Akun" component={AkunStackScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

const HomeStackScreen = () => {
  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    <HomeStack.Screen name="SekitarScreen" component={SekitarScreen} options={{ title: "Mitra Akftif Sekitarmu", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
    <HomeStack.Screen name="LangsungScreen" component={LangsungScreen} options={{ title: "Temu Langsung", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
    <HomeStack.Screen name="DalamMitra" component={DalamMitra} options={{ headerShown: false }} />
  </HomeStack.Navigator>
  );
};

const AkunStackScreen = () => {
  return(
  <AkunStack.Navigator>
    <AkunStack.Screen name="AkunScreen" component={AkunScreen} options={{ headerShown: false }}/>
    <AkunStack.Screen name="EditScreen" component={EditScreen} />
  </AkunStack.Navigator>
  );
};

const RiwayatStackScreen = () => {
  return(
  <RiwayatStack.Navigator>
    <RiwayatStack.Screen name="RiwayatScreen" component={RiwayatScreen} options={{ headerShown: false }}/>
  </RiwayatStack.Navigator>
  );
};

const Gerbang = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const DalamMitra = () => {
  return(
    <Stack.Navigator initialRouteName="PosisiScreen">
      <Stack.Screen name="PosisiScreen" component={PosisiScreen} options={{ title: "Posisi Mitra", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
      <Stack.Screen name="KategoriScreen" component={KategoriScreen} options={{ title: "Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
    </Stack.Navigator>
  )
}

const Routernih = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Gerbang" component={Gerbang} options={{ headerShown: false }}/>
        <Stack.Screen name="AppUtama" component={AppUtama} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Routernih

const styles = StyleSheet.create({})