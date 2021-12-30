import * as React from 'react';
import DataContext from '../../context/DataContext';
import { StyleSheet, TextInput, Text, View, Picker, SafeAreaView, Button } from 'react-native';
import DatePicker from "@react-native-community/datetimepicker"



const EditExpensePage = ({navigation, route}) => {

   
  const {entry} = route.params

   // useContext
   const { userContext, expenseEntryContext } = React.useContext(DataContext)
   const [userId, setUserId]=userContext

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
        // pass the data into params ele so that showpage will show latest updated data
        const data = await res.json()
       
        navigation.navigate("Show Expense Page", {entry: data})

      } catch(err){
        console.log(err)
      }
    
        
      }


    return (
       
        <SafeAreaView style={styles.container} >
        <Text>Id: {entry._id}</Text>
            <View>
          
                 <DatePicker
                  style={styles.datepicker}
                  value={date}
                  onChange={onChangeDate}
                  //onChangeDate={(date)=> setDate(date)}
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
                    handleSubmit(entry)}} />
                  <Button title="Back" onPress={()=>navigation.navigate("Show Expense Page", {entry})
                  } />
                </View>

                
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
      paddingHorizontal: 1,
      // borderColor: "gray",
      // borderWidth: 1,
      // right: 100,
      justifyContent: "center"
      
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