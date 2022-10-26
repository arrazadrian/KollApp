import { Pressable, StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ListMitra from '../Components/ListMitra'
import { Ijo, Kuning, Hitam, Putih, IjoTua, IjoMint } from '../Utils/Warna'
import { getFirestore, collection, query, where, getDocs, doc, orderBy, startAt, endAt } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { useSelector } from 'react-redux';
import { noMitra } from '../assets/Images/Index';
import VoucherAktif from '../Components/VoucherAktif';

const VoucherScreen = () => {
  return (
    <View style={styles.latar}>
      <VoucherAktif/>
    </View>
  )
}

export default VoucherScreen

const styles = StyleSheet.create({
    latar:{
        flex:1,
        backgroundColor: Kuning,
    },
})