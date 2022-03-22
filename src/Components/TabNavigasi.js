import React, {Component} from "react"
import {Platform, StyleSheet, Text, View} from 'react-native'

export default function TabNavigasi(){
    return(
        <View style={{height:54, backgroundColor: 'white', flexDirection:'row'}}>
            <View style={{flex: 1, alignContent:'center', justifyContent:'center'}}>
                <View>
                    <Text>Rumah</Text>
                </View>
                <Text>Beranda</Text>
            </View>
            <View style={{flex: 1, alignContent:'center', justifyContent:'center'}}>
                <View>
                    <Text>Receipt</Text>
                </View>
                <Text>Transaksi</Text>
            </View>
            <View style={{flex: 1, alignContent:'center', justifyContent:'center'}}>
                <View>
                    <Text>Orang</Text>
                </View>
                <Text>Akun</Text>
            </View>
        </View>
    );

} 