import * as React from 'react';
import DataContext from '../../context/DataContext';
import { StyleSheet, TextInput, Text, View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"


const EditExpensePage = ({navigation, route}) => {

   
  const expense = route.params

   // useContext
   const { userContext } = React.useContext(DataContext)
   const [userId, setUserId]=userContext

  const {expenseEntryContext} = React.useContext(DataContext)
  const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext


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
      } catch(err){
        console.log(err)
      }
    
        // need to work on back button to edited show page
        // needs to reload singleExpense
       
        navigation.navigate("Show Expense Page", expense)
        
      }


    return (
       
        <SafeAreaView style={styles.container} >
        <Text>Id: {expense._id}</Text>
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
                
                
                <Button title="Submit" onPress={()=>handleSubmit(expense)} />


                
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