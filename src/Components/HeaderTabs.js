import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Abu, Ijo, Putih } from '../Utils/Warna'

const HeaderTabs = () => {
  const [activeTab, setActiveTab] = useState("Dalam Proses");
  return (
    <View  style={{flexDirection:'row', alignSelf:'center'}}>
      <HeaderButton 
      text="Dalam Proses" 
      btnColor= "Ijo" 
      textColor="Putih"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      />
       <HeaderButton 
      text="Sudah Selesai" 
      btnColor= "Putih" 
      textColor="Ijo"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      />
    </View>
  )
} 

export default HeaderTabs

const HeaderButton = (props) => {
    return (
        <TouchableOpacity style={{
          backgroundColor: props.activeTab === props.text ? Ijo : Putih, 
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          marginHorizontal: 3,
          width: 155,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => props.setActiveTab(props.text)}
        >
            <Text style={{fontSize: 16, color: props.activeTab === props.text ? Putih : Ijo}}>{props.text}</Text>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({})