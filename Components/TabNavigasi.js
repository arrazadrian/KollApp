import * as React from 'react' 
import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from '../Screens/HomeScreen.js'
import TransaksiScreen from '../Screens/TransaksiScreen.js'
import AkunScreen from '../Screens/AkunScreen.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Nama Variabel Screen
const homeName = 'Beranda'
const transaksiName = 'Transaksi'
const akunName = 'Akun'

const Tab = createBottomTabNavigator();

export default function TabNavigasi(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='HomeScreen'
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName){
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === transaksiName){
                            iconName = focused ? 'receipt' : 'receipt-outline'
                        } else if (rn === akunName){
                            iconName = focused ? 'happy' : 'happy-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>

                 }
            })}>

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={transaksiName} component={TransaksiScreen}/>
            <Tab.Screen name={akunName} component={AkunScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}