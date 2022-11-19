import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import React, { useState } from 'react';
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { updateakunTanpafoto, updateakunDenganfoto } from '../../API/firebasemethod';
import * as ImagePicker from 'expo-image-picker';
import { Logo } from '../assets/Images/Index';

const { height, width } = Dimensions.get('window')

const EditAkunScreen = ({navigation, route}) => {

  const { nama, foto, phone } = route.params;

  const [namaakun, setNamaakun] = useState(nama)
  const [fotoakun, setFotoakun] = useState(foto)
  const [phoneakun, setPhoneakun] = useState(phone)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoakun(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
    
    return result.assets[0].uri
    
  };


  const handleperbaruiakun = async () =>{
    if ( !fotoakun || fotoakun == foto){
        if (!namaakun) {
          Alert.alert('Nama lengkap masih kosong','Isi nama lengkap anda.');
        } else if (!phoneakun && 9 < phoneakun.length < 14) {
          Alert.alert('No. Handpone tidak bisa kosong','Isi No. Handpone dengan benar.');
        } else { 
          await updateakunTanpafoto(
            namaakun,
            phoneakun,
          );
          navigation.goBack();
        };
    } else {
      if (!namaakun) {
        Alert.alert('Nama lengkap masih kosong','Isi nama lengkap anda.');
      } else if (!phoneakun && 9 < phoneakun.length < 14) {
        Alert.alert('No. Handpone tidak bisa kosong','Isi No. Handpone dengan benar.');
      } else {
        await updateakunDenganfoto(
            fotoakun,
            namaakun,
            phoneakun,
        );
        navigation.goBack();
      };
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.latar}>
            <View style={styles.atas}>
            { fotoakun ? (
                <Image source={{uri: fotoakun}} style={styles.gambar}/>
                ):(
                <Image source={Logo} style={styles.gambar}/>
            )}
                  <Text 
                  onPress={pickImage}
                  style={{color: Ijo, fontWeight: 'bold', fontSize: 20}}>
                    Ganti Foto 
                  </Text>
            </View>
            <View style={{padding:10}}>
                <Text style={styles.judulisi}>Nama</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Nama anda tidak bisa kosong"
                value={namaakun}
                onChangeText={namaakun => setNamaakun(namaakun)}
                />
                <Text style={styles.judulisi}>No.Handphone</Text>
                <TextInput style={styles.input} 
                  placeholder="Nama toko tidak bisa kosong"
                  keyboardType='numeric'
                  value={phoneakun}
                  onChangeText={phoneakun => setPhoneakun(phoneakun)}
                  />
            </View>
            <TouchableOpacity style={styles.tombol}
              onPress={handleperbaruiakun}
            >
              <Text 
              style={styles.simpan}
              >Simpan</Text>
            </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default EditAkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
    padding: 20,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Putih,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: IjoTua,
    borderWidth: 1,
  },
  atas:{
    alignItems: 'center',
  },
  input:{
    borderBottomWidth: 2,
    borderColor: Ijo,
    marginBottom: 10,
    fontSize: 20,
    color: Putih,
  },
  judulisi:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Putih,
  },
  tombol:{
    backgroundColor: Ijo,
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: width*0.8,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  simpan:{
    color: Putih, 
    fontWeight: 'bold',
    fontSize: 20,
  },
})