import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HeaderTabs = () => {
  return (
    <View>
      <HeaderButton text="Dalam Proses"/>
      <HeaderButton text="Sudah Selesai"/>
    </View>
  )
} 

export default HeaderTabs

const HeaderButton = (props) => {
    return (
        <View style={{flexDirection:'row', alignSelf:'center'}}>
            <TouchableOpacity>
                <Text>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    tulisan:{
        fontSize: 20,
        
    },
})