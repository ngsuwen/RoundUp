import React, {useState, useEffect} from 'react';
import {useContext} from "react"
import DataContext from '../../context/DataContext';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"



const EntryExpensePage = ({navigation}) => {
 

   // useContext
   const { userContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const {expenseEntryContext} = useContext(DataContext)
   const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext
   const {expenseForceRenderContext} = useContext(DataContext)
   const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

   // clear states onload at entryexpense page
  useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
      setAmount(null)
      setSelectedValue(null)
      setDescription("")
    })
  }, [navigation])
  

   //work in progress
  //  const categories = ["Shopping", "Food", "Health", "Transportation", "Household"]
  //  const CategoryList = () =>{
  //    return <View style={styles.categoryContainer}>
  //      {categories.map((item, index)=>(
  //        <Text key={index} style={[styles.categoryText]}>{item}</Text>
  //      ))}
  //    </View>
  //  }
  ///////////////////////

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
        
      setExpenseForceRender(!expenseForceRender)

      } catch(err){
        console.log(err)
      }
        
        navigation.navigate("Expense GP")
        
      }
    return (
        
        <SafeAreaView style={styles.container} >
          <Text>Username: {userId}</Text>
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
                
                <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit } />
                    <Button
                      title="Back"
                      onPress={() => navigation.navigate("Home")
                         }
                    />
                </View>
                
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
    categoryContainer:{
      flexDirection: "row",
      marginTop: 30,
      marginBottom: 20,
      justifyContent: "space-between"
    },
    categoryText:{
      fontSize: 16,
      color: "grey",
      fontWeight: "bold"
  
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
    },
    button:{
      flexDirection: "row",
      alignSelf: "center"
    }
})