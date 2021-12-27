import React, {useState} from 'react';
import {useContext} from "react"
import {UserContext} from "../../App"
import { StyleSheet, TextInput,View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"


const EditExpensePage = ({navigation}) => {
 
   const [date, setDate] = useState(new Date())
   const [amount, setAmount] = useState();
   //const [category, setCategory] = useState("");
   const [selectedValue, setSelectedValue] = useState("Shopping")
   const [description, setDescription] = useState("");

   // useContext
   const [userId] = useContext(UserContext)

   // Date Picker
   const onChangeDate = (event, selectedDate) =>{
     const currentDate = selectedDate || date;
     setDate(currentDate)
   }

    const handleSubmit = async (event, id) => {
      try{
        
        event.preventDefault();
        const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/${id}`, {
         
          method: "PUT",
          body: JSON.stringify(
            { 
              username: userId,
              expensesentry:[
                { 
                  
                  date: date,
                  amount: amount,
                  category: selectedValue,
                  description: description  }
                
              ]      
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
        navigation.navigate("Show Expense Page")
        
      }
    return (
       
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