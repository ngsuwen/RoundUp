import * as React from 'react';
import DataContext from '../../context/DataContext';
import { StyleSheet, TextInput, Text, View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"
import {
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";


const EditExpensePage = ({navigation, route}) => {

   
  const {entry} = route.params
  

  

   // useContext
   const { userContext, expenseEntryContext, expenseForceRenderContext } = React.useContext(DataContext)
   const [userId, setUserId]=userContext

  const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

 

    const handleSubmit = async (expense) => {
      try{
        
        // event.preventDefault();
        const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/${expense._id}/edit`, {
         
          method: "PUT",
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
          console.error('edit data expense failed')
        }
        setExpenseForceRender(!expenseForceRender)
        // pass the data into params ele so that showpage will show latest updated data
        const data = await res.json()
       
        navigation.navigate("Show Expense Page", {entry: data})

      } catch(err){
        console.log(err)
      }
    
        
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
            <Text>Id: {entry._id}</Text>
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
                  <Button title="Update" onPress={()=>{
                    handleSubmit(entry)
                    // this is needed to force showpage to re-render as it will not mount again
                    //setExpenseForceRender(!expenseForceRender) //not needed
                    }} />
                  <Button title="Back" onPress={()=>navigation.navigate("Show Expense Page", {entry})
                          
                         } />
                </View>

                
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
        </NativeBaseProvider>
    )
}

export default EditExpensePage;

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
      justifyContent: "flex-end",
    }
})