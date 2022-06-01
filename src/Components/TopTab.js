import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Abu, Ijo, IjoTua, Putih } from '../Utils/Warna';
import { 
    ProsesScreen,
    RiwayatScreen, 
  } from '../Screens/Index.js'


const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
        initialRouteName='ProsesScreen'
        screenOptions={{
            activeTintColor: Putih,
            inactiveTintColor: IjoTua,
            style:{ backgroundColor: Ijo },
        }}
        //style={styles.container}
    >
        <Tab.Screen 
            name="ProsesScreen" 
            component={ProsesScreen} 
            options={{ tabBarLabel: "Dalam Proses" }} />
        
        <Tab.Screen 
            name="RiwayatScreen" 
            component={RiwayatScreen} 
            options={{ tabBarLabel: "Sudah Selesai" }} />
    </Tab.Navigator>
  )
}

export default TopTab

const styles = StyleSheet.create({
  container:{
    backgroundColor: Ijo,
   paddingTop: 20, 
  }
})