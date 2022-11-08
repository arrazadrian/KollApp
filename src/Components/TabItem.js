import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {
   IconAkunIjo, IconAkunPutih,
   IconHomeIjo, IconHomePutih,
   IconRiwayatIjo, IconRiwayatPutih
} from '../assets/Icons/Index'
import { IjoTua, Putih } from '../Utils/Warna'
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy, updateDoc } from 'firebase/firestore';
import { app } from '../../Firebase/config';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TabItem = ({ isFocused, onPress, onLongPress, label}) => {
  const Icon = () => { 
    if(label === "Beranda") return isFocused ? <IconHomePutih/> : <IconHomeIjo/>
    if(label === "Riwayat") return isFocused ? <IconRiwayatPutih/> : <IconRiwayatIjo/>
    if(label === "Akun") return isFocused ? <IconAkunPutih/> : <IconAkunIjo/>
  }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const getTokenNoticifation = async (token) => {
    console.log('Get token jalan')
    const auth = getAuth();
    const db = getFirestore(app);
    const docrefmit = doc(db, "pelanggan",  auth.currentUser.uid);
    getDoc(docrefmit).then(docSnap => {
      if (docSnap.exists()) {
        try {
          if (token != docSnap.data().token_notif){
              updateDoc(docrefmit, {
              token_notif: token,
              });
              console.log('Token notif pelanggan diperbarui')
          }
        } catch (err) {
          Alert.alert('Ada error dapetin token notif!', err.message);
        }
      } else {console.log('Tidak ada dokumen tersebut, ada salah dalam ganti notif')}
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      getTokenNoticifation(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon style={{
               height: 15,
               width: 15
            }}/>
            <Text style={{ 
              fontSize: 14,
              color: isFocused ? Putih : IjoTua,
              marginTop: 6}}>
            {label}
            </Text>
    </TouchableOpacity>
  )
}

export default TabItem

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
});