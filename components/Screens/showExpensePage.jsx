import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native'
import {useContext} from "react"
import {EntryContext} from "../../App"


const ShowExpensePage = ({navigation, route }) => {

    const expense = route.params
    // console.log("expense", expense)

      // route DELETE
      const deleteExpense = async (id) => {
        const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/${id}`, {
          method: 'DELETE'
        })
        if (res.status !== 200) {
          console.error('failed to delete expense')
          return
        }
        
        navigation.navigate("Index Expense Page")
      }

    return (
        
        <SafeAreaView style={styles.container}>
          <View>
            <Text>Id: {expense._id}</Text>
            <Text>Username: {expense.username}</Text>
            <Text>Date: {expense.expensesentry[0].date}</Text>
            <Text>Amount: $ {expense.expensesentry[0].amount}</Text>
            <Text>Category: {expense.expensesentry[0].category}</Text>
            <Text>Description: {expense.expensesentry[0].description}</Text>
            <View>
               <Button title="Delete" onPress={()=> deleteExpense(expense._id)}/>
               <Button title="Edit" onPress={()=>navigation.navigate("Edit Expense Page", expense)}/>
            </View>

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
        
     
    },
    scrollView:{
      
      marginHorizontal: 20,
    }

})