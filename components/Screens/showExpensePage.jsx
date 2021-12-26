import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button } from 'react-native'
import {useContext} from "react"
import {EntryContext} from "../../App"


const ShowExpensePage = () => {
  
  const [expense, setExpense] = useState(null)

   // useContext
   const [allExpenses, reloadExpense] = useContext(EntryContext)


   useEffect(() => {
      reloadExpense()
   }, [allExpenses])


  
 

    return (
        
        <SafeAreaView style={styles.container}>
            <View>
             {allExpenses.map((ele,i)=>{
               return(
                 <Text key={ele._id}>{ele.expensesentry[0].amount}</Text>
               )
             })}
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