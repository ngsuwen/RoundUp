import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native'
import {useContext} from "react"
import {EntryContext} from "../../App"


const IndexExpensePage = ({navigation }) => {
  // const exp = route.params
  // console.log("exp:". exp)
  const [expense, setExpense] = useState({})

   // useContext
   const [allExpenses, reloadExpense] = useContext(EntryContext)


   useEffect(() => {
      reloadExpense()
   }, [allExpenses])


   // to work on below
  //  useEffect(() => {
  //   if (!expense) {
  //     return
  //   }
  //   const updated = allExpenses.find((_expense) => _expense._id === expense._id)
  //   if (updated) {
  //     setExpense(updated)
      
  //   } else {
  //     setExpense({})
  //   }

  // }, [allExpenses])
  

    // route show

    // useEffect( async(id) => {
   
    //   try {
    //     const res = await fetch(
    //       `https://roundup-api.herokuapp.com/data/expense/${id}`);
    //     const data = await res.json();
    //     setExpense(data)
    //   } catch (err) {
    //     console.log(err)
    //   }


    // }, [])


   



    // const deleteHoliday = async (id) => {
    //   const res = await fetch(`${BACKEND_BASE_URL}/holidays/${id}`, {
    //     method: 'DELETE'
    //   })
    //   if (res.status !== 200) {
    //     console.error('failed to delete holidays')
    //     return
    //   }
    //   reloadHolidays();
    // }
 

    return (
        
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
            <Text>Expense Summary</Text>
             {allExpenses.map((ele,i)=>{
               return(
                 <TouchableOpacity onPress={()=>navigation.navigate("Show Expense Page", ele)}>
                 <View >
                 <Text>Id: {ele._id}</Text>
                 <Text>Username: {ele.username}</Text>
                 <Text>Date: {ele.expensesentry[0].date}</Text>
                 <Text >Amount: $ {ele.expensesentry[0].amount}</Text>
                 <Text >Category: {ele.expensesentry[0].category}</Text>
                 <Text >Description: {ele.expensesentry[0].description}</Text>
                 </View>
                 </TouchableOpacity>
               )
             })}
     
            </View>

          

            </ScrollView>
        </SafeAreaView>
            
        
    )
    }


    export default IndexExpensePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
     
    },
    scrollView:{
      
      marginHorizontal: 20,
    }

})