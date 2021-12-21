import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';

export default function EntryPage() {
    return (
        
        <View style={styles.container}>
            <Text>Entry Page Component</Text>
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