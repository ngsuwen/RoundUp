import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, ScrollView, Button, Modal, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const OPTIONS = ["Shopping", "Food", "Health", "Transportation", "Household"]
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
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={()=> onPressItem(item)}
                >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity
            onPress={()=> changeModalVisibility(false)}
            style={styles.container}
            >
                <View style={[styles.modal, {width: WIDTH - 20, height: HEIGHT / 2}]}>
                    <ScrollView>
                        {option}
                    </ScrollView>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 300

    },
    modal:{
        backgroundColor: "gray",
        borderRadius: 10

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