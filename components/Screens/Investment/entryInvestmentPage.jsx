import React, {useState, useEffect} from 'react';
import {useContext} from "react"
import DataContext from '../../../context/DataContext';
import { StyleSheet, Pressable, Text, TextInput,View, Picker, SafeAreaView, Button, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"
import { ModalTickerPicker } from './modalInvestTickerPicker';
import { ModalCatPicker} from "./modalInvestCatPicker"

import {
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";


const EntryInvestmentPage = ({navigation}) => {
 
   // useContext
   const { userContext, investmentEntryContext, expenseForceRenderContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const [dateInvestment,setDateInvestment,amountInvestment,setAmountInvestment,categoryInvestment,setCategoryInvestment,tickerInvestment,setTickerInvestment, qtyInvestment, setQtyInvestment] = investmentEntryContext
   const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

   // useState
   const [show, setShow] = useState(false);

    // Modal for category
    const [isModalVisibleCat, setIsModalVisibleCat] = useState(false)

    const changeModalVisibilityCat = (bool) =>{
    setIsModalVisibleCat(bool)
    }

    const setDataCat = (option) =>{
      setCategoryInvestment(option)
    }

   // Modal for ticker
   const [isModalVisibleTicker, setIsModalVisibleTicker] = useState(false)

   const changeModalVisibilityTicker = (bool) =>{
    setIsModalVisibleTicker(bool)
   }

   const setDataTicker = (option) =>{
     setTickerInvestment(option)
   }

   
   // clear states onload at entrycash page
  useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
      setDateInvestment(new Date())
      setAmountInvestment([])
      setCategoryInvestment("Select Category...")
      setQtyInvestment([])
      setTickerInvestment("Select Ticker...")
    })
     return resetPage
  }, [expenseForceRender])


    // Date Picker
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || new Date(dateInvestment);
      setDateInvestment(currentDate);
      
    };


    const handleSubmit = async (event) => {
      try{

        event.preventDefault();
        const res = await fetch("https://roundup-api.herokuapp.com/data/investment", {
         
          method: "POST",
          body: JSON.stringify(
            { 
              username: userId,
              investmentsentry:
                { 
                  
                  date: dateInvestment,
                  amount: amountInvestment,
                  category: categoryInvestment,
                  ticker: tickerInvestment,
                  quantity: qtyInvestment  }
                
                 
            }
            ),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(res.status!==200){
          console.error('create data investment failed')
        }
        
      setExpenseForceRender(!expenseForceRender)

      } catch(err){
        console.log(err)
      }
        
        navigation.navigate("Index Investment Page")
        
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
            
            {/* date */}
            <View style={styles.wrapper} >
                <DatePicker
                  style={styles.datepicker}
                  value={new Date(dateInvestment)}
                  onChange={onChangeDate}
                  />
                  
                  </View>

                 {/* amount */}
                <View style={styles.wrapper} >
                  <TextInput
                      style={styles.textinput}
                      type="submit" 
                      name="amount"
                      placeholder="Enter Amount"
                      value={amountInvestment.toString()}
                      onChangeText={(text) => setAmountInvestment(text)}
                        />   
                        <Button
                          title="Clear"
                          onPress={()=>setAmountInvestment([])}
                          />
                    </View>

                  {/* quantity */}
                  <View style={styles.wrapper} >
                      <TextInput
                          style={styles.textinput}
                          type="submit" 
                          name="quantity"
                          placeholder="Enter Quantity"
                          value={qtyInvestment.toString()}
                          onChangeText={(text) => setQtyInvestment(text)}
                            />   
                            <Button
                              title="Clear"
                              onPress={()=>setQtyInvestment([])}
                              />
                    </View>
        
              

                        {/* category */}
                        <View style={styles.wrapper}>

                        <Pressable 
                            style={styles.pressable}
                            onPress={()=> changeModalVisibilityCat(true)}
                            >
                            <Text style={styles.catText}>{categoryInvestment}</Text>

                        </Pressable>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleCat}
                            onRequestClose={()=> changeModalVisibilityCat(false)}

                        >
                            <ModalCatPicker 
                              changeModalVisibilityCat={changeModalVisibilityCat}
                              setDataCat={setDataCat}
                            />
                            
                        </Modal>
                      
                        </View>


                    {/* ticker */}
                    <View style={styles.wrapper}>

                          <Pressable 
                            style={styles.pressable}
                            onPress={()=> changeModalVisibilityTicker(true)}
                            >
                            <Text style={styles.catText}>{tickerInvestment}</Text>

                          </Pressable>
                          <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleTicker}
                            onRequestClose={()=> changeModalVisibilityTicker(false)}

                          >
                            <ModalTickerPicker 
                              changeModalVisibilityTicker={changeModalVisibilityTicker}
                              setDataTicker={setDataTicker}
                            />
                            
                          </Modal>

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

export default EntryInvestmentPage;

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


