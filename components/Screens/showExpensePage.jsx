import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button } from 'react-native'



const ShowExpensePage = () => {
  
  const [allExpense, setAllExpense] = useState()
  const [expense, setExpense] = useState(null)


    // route GET
    const getExpense = async () => {
      try{

        const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/`)
        const data = await response.json()
        setAllExpense(data)
        console.log(data)
      } catch(err){
        return err.json()
      }
    }
  

    

    return (
        
        <SafeAreaView style={styles.container}>
            <View>
             <Text>Hello</Text>
            </View>

          


        </SafeAreaView>
            
        
    )
    }


    export default ShowExpensePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})