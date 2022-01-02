import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, ScrollView, Button, Modal, Dimensions, Pressable } from 'react-native';



const OPTIONS = ["Shopping", "Food", "Health", "Transportation", "Household", "Others"]
const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const ModalPicker = (props) =>{
    const {changeModalVisibility, setData} = props

    const onPressItem = (option) =>{
        changeModalVisibility(false)
        setData(option)
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
            onPress={()=> changeModalVisibility(false)}
            style={styles.container}
            >
                <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
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
        backgroundColor: "gray",
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

export {ModalPicker}