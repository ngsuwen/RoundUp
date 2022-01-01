import React, {useState, useEffect} from 'react';
import {useContext} from "react"
import DataContext from '../../../context/DataContext';
import { StyleSheet,Text, TextInput,View, Picker, SafeAreaView, Button, Modal, Dimensions } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"
import { ModalPicker } from './modalExpensePicker';

import {
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';



const EntryExpensePage = ({navigation}) => {
 

   // useContext
   const { userContext, expenseEntryContext, expenseForceRenderContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const [date,setDate,amount,setAmount,category,setCategory,description,setDescription] = expenseEntryContext
   const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

   // useState
   const [show, setShow] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false)

   const changeModalVisibility = (bool) =>{
    setIsModalVisible(bool)
   }

   const setData = (option) =>{
     setCategory(option)
   }
 


   // clear states onload at entryexpense page
  useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
      setDate(new Date())
      setAmount([])
      setCategory("Select Category...")
      setDescription("")
    })
     return resetPage
  }, [expenseForceRender])


    // Date Picker
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || new Date(date);
      setDate(currentDate);
      //setShow(false)
    };


  

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
                  category: category,
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
      <NativeBaseProvider>
          <KeyboardAvoidingView

                h={{
                  base: "100%",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
      >
 
      <SafeAreaView style={styles.container} >
        <View style={styles.inner}>
            
                <DatePicker
                  style={styles.datepicker}
                  value={new Date(date)}
                  onChange={onChangeDate}
                  
                  />
                <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="amount"
                    placeholder="Enter Amount"
                    value={amount.toString()}
                    onChangeText={(text) => setAmount(text)}
                      />   
            
        
                
                {/* <Picker
                  selectedValue={category}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                >
                
                  <Picker.Item label="Shopping" value="Shopping" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Health" value="Health" />
                  <Picker.Item label="Transportation" value="Transportation" />
                  <Picker.Item label="Household" value="Household" />

                </Picker> */}


              
                
               <TouchableOpacity 
                  style={styles.touchableOpacity}
                  onPress={()=> changeModalVisibility(true)}
                  >
                  <Text style={styles.text}>{category}</Text>

               </TouchableOpacity>
               <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isModalVisible}
                  nRequestClose={()=> changeModalVisibility(false)}

               >
                  <ModalPicker 
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                  />
                  
               </Modal>
             

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
         </KeyboardAvoidingView>
     </NativeBaseProvider>
            
        
    )
}

export default EntryExpensePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 100
        
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
      
      width: "100%",
      // borderColor: "gray",
      // borderWidth: 1,
      right: 100,
      
    },
    textinput:{
      paddingVertical: 15,
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
    },
    inner: {
      padding: 20,
      flex: 1,
      // justifyContent: "flex-end",
    },
    text: {
      marginVertical: 20,
      fontSize: 25
    },
    touchableOpacity:{
      backgroundColor: "orange",
      alignSelf: "stretch",
      paddingHorizontal: 20,
      marginHorizontal: 20
    }
 
})