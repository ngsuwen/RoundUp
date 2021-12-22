import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button } from 'react-native'

const BACKEND_BASE_URL=process.env.REACT_APP_BACKEND_BASE_URL

export default function ShowPage() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`${BACKEND_BASE_URL}/data/cash`, {
          method: "POST",
          body: JSON.stringify({ description: event.target.name.value }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(res.status!==200){
          console.error('create data cash failed')
        }
        
      }


    return (
        
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput 
                    type="text" 
                    name="name"
                    placeholder='Show Page'
                      />   
                {/* <Button title="Submit" onPress={handleSubmit}></Button> */}


                {/* <TextInput type="text" placeholder='Date'  />   
                <TextInput type="text" placeholder='Amount'  /> 
                <TextInput type="text" placeholder='Category'  /> 
                <TextInput type="text" placeholder='Description'  />  */}
    
            </View>

          


        </SafeAreaView>
            
        
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