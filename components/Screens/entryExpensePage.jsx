import React, {useState} from 'react';
import {useContext} from "react"
import DataContext from '../../context/DataContext';
import { StyleSheet, TextInput,View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"



const EntryExpensePage = ({navigation}) => {
 

   // useContext
   const { userContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const {expenseEntryContext} = useContext(DataContext)
   const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext
 
  

    const handleSubmit = async (event) => {
      try{
        
        event.preventDefault();
        const res = await fetch("https://roundup-api.herokuapp.com/data/expense", {
         
          method: "POST",
          body: JSON.stringify(
            { 
              username: userId,
              expensesentry:
                { 
                  
                  date: date,
                  amount: amount,
                  category: selectedValue,
                  description: description  }
                
                 
            }
            ),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(res.status!==200){
          console.error('create data expense failed')
        }
      } catch(err){
        console.log(err)
      }
        navigation.navigate("Index Expense Page")
        
      }
    return (
        // work on username ref 
        <SafeAreaView style={styles.container} >
            <View>
                <DatePicker
                  style={styles.datepicker}
                  value={date}
                  onChange={onChangeDate}
                  />
                <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="amount"
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                      />   
                {/* <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="category"
                    placeholder="Enter Category"
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                      />    */}
        
                
                <Picker
                  selectedValue={selectedValue}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                
                  <Picker.Item label="Shopping" value="Shopping" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Health" value="Health" />
                  <Picker.Item label="Transportation" value="Transportation" />
                  <Picker.Item label="Household" value="Household" />

                </Picker>
                

                <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="description"
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                      /> 
                
                
                <Button title="Submit" onPress={handleSubmit} />


                
            </View>
        </SafeAreaView>
            
        
    )
}

export default EntryExpensePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    datepicker:{
      paddingVertical: 10,
      paddingHorizontal: 10,
      // borderColor: "gray",
      // borderWidth: 1,
      right: 100,
      
    },
    textinput:{
      paddingVertical: 20,
      paddingHorizontal: 100,
      marginTop: 10,
      marginBottom: 10,
      borderColor: "gray",
      borderWidth: 1,
    },
    picker:{
      justifyContent: "center",
      // left: 60,
   

      
    }
})