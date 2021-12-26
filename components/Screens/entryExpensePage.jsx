import React, {useState} from 'react';
import { StyleSheet, TextInput, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"
//const BACKEND_BASE_URL=process.env.REACT_APP_BACKEND_BASE_URL


const EntryExpensePage = () => {

   const [date, setDate] = useState(new Date())
   const [amount, setAmount] = useState();
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");

   const onChangeDate = (event, selectedDate) =>{
     const currentDate = selectedDate || date;
     setDate(currentDate)
   }




    const handleSubmit = async (event) => {
      try{

        event.preventDefault();
        const res = await fetch("https://roundup-api.herokuapp.com/data/expense", {
         
          method: "POST",
          body: JSON.stringify(
            { 
              expensesentry:[
                { 
                  date: date,
                  amount: amount,
                  category: category,
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
        
      }
    return (
        // work on username ref and date
        <SafeAreaView style={styles.container} >
            <View>
                <DatePicker
                  value={date}
                  onChange={onChangeDate}
                  />
                <TextInput
                    type="submit" 
                    name="amount"
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                      />   
                <TextInput
                    type="submit" 
                    name="category"
                    placeholder="Enter Category"
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                      />   
                <TextInput
                    type="submit" 
                    name="description"
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                      />   
                <Button title="Submit" onPress={handleSubmit} />


                {/* <TextInput type="text" placeholder='Date'  />   
                <TextInput type="text" placeholder='Amount'  /> 
                <TextInput type="text" placeholder='Category'  /> 
                <TextInput type="text" placeholder='Description'  />  */}
    
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
    }
})