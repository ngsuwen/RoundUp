import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';

export default function EntryPage() {
    return (
        
        <View style={styles.container}>
            <View>
                <TextInput type="text" placeholder='Name'  />   
                <TextInput type="text" placeholder='Date'  />   
                <TextInput type="text" placeholder='Amount'  /> 
                <TextInput type="text" placeholder='Category'  /> 
                <TextInput type="text" placeholder='Description'  /> 
    
            </View>

          


        </View>
            
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})