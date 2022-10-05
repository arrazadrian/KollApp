import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTab from '../Components/TopTab.js';
import { 
  AkunScreen, 
  CheckoutScreen,
  DetailScreen,
  EditAkunScreen,
  EtalaseScreen,
  FLocScreen,
  HomeScreen,
  LangsungScreen,
  LoadingScreen,
  LokasiScreen,
  OtwScreen,
  PreorderScreen,
  ProdukScreen,
  ProsesScreen,
  ReceiptScreen,
  RiwayatScreen, 
  SekitarScreen, 
  SignInScreen,
  SignUpScreen,
} from '../Screens/Index.js'
import TabNavigasi from '../Components/TabNavigasi.js';
import { NavigationContainer } from '@react-navigation/native';
import { Ijo, Putih } from '../Utils/Warna.js';
import { Provider } from 'react-redux';
import { store } from '../../store.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiwayatStack = createNativeStackNavigator();
const AkunStack = createNativeStackNavigator();

const HomeStackScreen = () =>{
  return(
      <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
          <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Riwayat" component={TopTab} options={{ headerShown: false }}/>
          <Tab.Screen name="Akun" component={AkunStackScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

export const AppUtama = () => {
  return(
  <NavigationContainer>
    <Provider store={store}>
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeStackScreen} options={{ headerShown: false }}/>
        <HomeStack.Screen name="FLocScreen" component={FLocScreen} options={{ title: "Tentukan Lokasi", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
        <HomeStack.Screen name="SekitarScreen" component={SekitarScreen} options={{ title: "Mitra Akftif Sekitarmu", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
        <HomeStack.Screen name="LangsungScreen" component={LangsungScreen} options={{ title: "Temu Langsung", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
        
        <HomeStack.Screen name="EtalaseScreen" component={EtalaseScreen} options={{ title: "Detail Mitra", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
        <HomeStack.Screen name="ProdukScreen" component={ProdukScreen} options={{ title: "Produk Utama", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
        <HomeStack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }}  />
        <HomeStack.Screen name="LokasiScreen" component={LokasiScreen} options={{ headerShown: false }}  />
        <HomeStack.Screen name="PreorderScreen" component={PreorderScreen} options={{ title: "Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
        <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: "Checkout", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
        <HomeStack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }}  />
        <HomeStack.Screen name="OtwScreen" component={OtwScreen} options={{ headerShown: false }}/>
        
        <HomeStack.Screen name="ReceiptScreen" component={ReceiptScreen} options={{ title: "Detail Transaksi", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
      </HomeStack.Navigator>
    </Provider>
  </NavigationContainer>
  );
};

const AkunStackScreen = () => {
  return(
  <AkunStack.Navigator>
    <AkunStack.Screen name="AkunScreen" component={AkunScreen} options={{ headerShown: false }}/>
    <AkunStack.Screen name="EditAkunScreen" component={EditAkunScreen} options={{ title: "Atur Profil", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
  </AkunStack.Navigator>
  );
};

const RiwayatStackScreen = () => {
  return(
  <RiwayatStack.Navigator>
    <RiwayatStack.Screen name="RiwayatScreen" component={RiwayatScreen} options={{ headerShown: false }}/>
    <RiwayatStack.Screen name="ProsesScreen" component={ProsesScreen} options={{ headerShown: false }}/>
  </RiwayatStack.Navigator>
  );
};

export const Gerbang = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DalamMitra = () => {
  return(
    <Stack.Navigator initialRouteName="PosisiScreen">
      <Stack.Screen name="ProdukScreen" component={ProdukScreen} options={{ title: "Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false   }}  />
      <Stack.Screen name="LokasiScreen" component={LokasiScreen} options={{ title: "Tentukan Lokasi Tujuan", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
      <Stack.Screen name="PreorderScreen" component={PreorderScreen} options={{ title: "Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: "Checkout", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}  />
      <Stack.Screen name="FLocScreen" component={FLocScreen} options={{ title: "Tentukan Lokasi" ,headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="OtwScreen" component={OtwScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const Routernih = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="Gerbang" component={Gerbang} options={{ headerShown: false }}/>
        <Stack.Screen name="AppUtama" component={AppUtama} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Routernih

const styles = StyleSheet.create({})