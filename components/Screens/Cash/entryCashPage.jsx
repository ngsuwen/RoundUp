import React, {useState, useEffect} from 'react';
import {useContext} from "react"
import DataContext from '../../../context/DataContext';
import { StyleSheet, Pressable, Text, TextInput,View, Picker, SafeAreaView, Button, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"
import { ModalPicker } from './modalCashPicker';

import {
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";


const EntryCashPage = ({navigation}) => {
 
   // useContext
   const { userContext, cashEntryContext, expenseForceRenderContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const [dateCash,setDateCash,amountCash,setAmountCash,categoryCash,setCategoryCash,descriptionCash,setDescriptionCash] = cashEntryContext
   const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

   // useState
   const [show, setShow] = useState(false);

   // Modal for category
   const [isModalVisible, setIsModalVisible] = useState(false)

   const changeModalVisibility = (bool) =>{
    setIsModalVisible(bool)
   }

   const setData = (option) =>{
     setCategoryCash(option)
   }
 


   // clear states onload at entrycash page
  useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
      setDateCash(new Date())
      setAmountCash([])
      setCategoryCash("Select Category...")
      setDescriptionCash("")
    })
     return resetPage
  }, [expenseForceRender])


    // Date Picker
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || new Date(dateCash);
      setDateCash(currentDate);
      
    };


    const handleSubmit = async (event) => {
      try{

        event.preventDefault();
        const res = await fetch("https://roundup-api.herokuapp.com/data/cash", {
         
          method: "POST",
          body: JSON.stringify(
            { 
              username: userId,
              cashentry:
                { 
                  
                  date: dateCash,
                  amount: amountCash,
                  category: categoryCash,
                  description: descriptionCash  }
                
                 
            }
            ),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(res.status!==200){
          console.error('create data cash failed')
        }
        
      setExpenseForceRender(!expenseForceRender)

      } catch(err){
        console.log(err)
      }
        
        navigation.navigate("Index Cash Page")
        
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
            
            <View style={styles.wrapper} >
                <DatePicker
                  style={styles.datepicker}
                  value={new Date(dateCash)}
                  onChange={onChangeDate}
                  />
                  
                  </View>

                <View style={styles.wrapper} >
                <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="amount"
                    placeholder="Enter Amount"
                    value={amountCash.toString()}
                    onChangeText={(text) => setAmountCash(text)}
                      />   
                      <Button
                        title="Clear"
                        onPress={()=>setAmountCash([])}
                        />
                  </View>
        
              
              <View style={styles.wrapper}>
                
               <Pressable 
                  style={styles.pressable}
                  onPress={()=> changeModalVisibility(true)}
                  >
                  <Text style={styles.catText}>{categoryCash}</Text>

               </Pressable>
               <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isModalVisible}
                  onRequestClose={()=> changeModalVisibility(false)}

               >
                  <ModalPicker 
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                  />
                  
               </Modal>
             
               </View>

              <View style={styles.wrapper}>
               <TextInput
                    style={styles.textinput}
                    type="submit" 
                    name="description"
                    placeholder="Enter Description"
                    value={descriptionCash}
                    onChangeText={(text) => setDescriptionCash(text)}
                      /> 
                      <Button
                        title="Clear"
                        onPress={()=>setDescriptionCash("")}
                        />
                </View>
               
                
                <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit} />
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

export default EntryCashPage;

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#e6e2d3',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: 100
        
    },  
    datepicker:{
      paddingVertical: 100,
      paddingHorizontal: 10,
      width: "100%",
           
      // borderColor: "gray",
      // borderWidth: 1,
      right: 100,
      
    },
    textinput:{
      paddingVertical: 1,
      paddingHorizontal: 1,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 20
      
      // borderColor: "gray",
      // borderWidth: 1,
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
    catText: {
      marginVertical: 10,
      fontSize: 22,
      textAlign: "center"
    },
    pressable:{
      backgroundColor: "#80ced6",
      alignSelf: "stretch",
      paddingHorizontal: 10,
      marginHorizontal: 10,
      borderRadius: 15
    
    },
    wrapper: {
      fontSize: 20,
      flex: 0.2,
      textAlign: "center",
      flexDirection:'column',
      width: screenWidth*0.86,
      backgroundColor: '#d5f4e6',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      paddingTop: 1,
      margin: '1%',
      shadowColor: "#000",
      shadowOffset: {
      width: 2,
      height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: .22,
      elevation: 3,
      },
 
})


