import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, ScrollView, Button, Modal, Dimensions, Pressable } from 'react-native';

const OPTIONS = ["Buy", "Sell"]


const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const ModalTransactionPicker = (props) =>{
    const {changeModalVisibilityTransaction, setDataTransaction} = props

    const onPressItem = (option) =>{
        changeModalVisibilityTransaction(false)
        setDataTransaction(option)
    }

    const option = OPTIONS.map((item, index)=>{
        return(
            <Pressable
                // style={styles.option}
                key={index}
                onPress={()=> onPressItem(item)}
                >
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

export {ModalTransactionPicker}



// <Pressable
//             onPress={()=> changeModalVisibilityTransaction(false)}
//             style={styles.container}
//             >
//                 <View style={[styles.modal, {width: WIDTH -20, height: HEIGHT / 2}]}>
//                     <ScrollView>
//                         {option}
//                     </ScrollView>
//                 </View>
//             </Pressable>