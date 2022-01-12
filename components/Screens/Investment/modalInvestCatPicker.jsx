import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, Picker, SafeAreaView, Button, Modal, Dimensions } from 'react-native';
import { Text, View, ScrollView, Pressable } from "native-base";

const OPTIONS = ["Crypto", "US stocks"]

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const ModalCatPicker = (props) =>{
    const {changeModalVisibilityCat, setDataCat} = props

    const onPressItem = (option) =>{
        changeModalVisibilityCat(false)
        setDataCat(option)
    }

    const option = OPTIONS.map((item, index)=>{
        return(
            <Pressable key={index} onPress={()=> onPressItem(item)}>
                <View mb="3" mt="3">
                <Text fontSize="sm">{item}</Text>
                </View>
                
            </Pressable>
        )
    })
    return(<ScrollView>{option}</ScrollView>)
}

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
       
        

//     },
//     modal:{
//         backgroundColor: "#b1cbbb",
//         borderRadius: 10,
     

//     },
//     option:{
//         alignItems: "flex-start",

//     },
//     text:{
//         margin: 20,
//         fontSize: 20,
//         fontWeight: "bold"

//     }
// })

export {ModalCatPicker}