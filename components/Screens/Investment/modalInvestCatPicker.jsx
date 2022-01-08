import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, ScrollView, Button, Modal, Dimensions, Pressable } from 'react-native';

const OPTIONS = ["Crypto", "US stocks"]

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const ModalCatPicker = (props) =>{
    const {changeModalVisibilityCat, setDataCat, setShow} = props

    const onPressItem = (option) =>{
        changeModalVisibilityCat(false)
        setDataCat(option)

        if (option === "Crypto"){
      
            setShow(true)
          } else{
            
            setShow(false)
          }
    }

    const option = OPTIONS.map((item, index)=>{
        return(
            <Pressable
                style={styles.option}
                key={index}
                onPress={()=> onPressItem(item)}
                >
                <Text style={styles.text}>
                    {item}
                </Text>
            </Pressable>
        )
    })
    return(
        <Pressable
            onPress={()=> changeModalVisibilityCat(false)}
            style={styles.container}
            >
                <View style={[styles.modal, {width: WIDTH -20, height: HEIGHT / 2}]}>
                    <ScrollView>
                        {option}
                    </ScrollView>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
       
        

    },
    modal:{
        backgroundColor: "#b1cbbb",
        borderRadius: 10,
     

    },
    option:{
        alignItems: "flex-start",

    },
    text:{
        margin: 20,
        fontSize: 20,
        fontWeight: "bold"

    }
})

export {ModalCatPicker}