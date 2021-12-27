import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, Dimensions, Button } from 'react-native'
import {useContext} from "react"
import {EntryContext} from "../../App"


const ShowExpensePage = ({navigation, route}) => {
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
            <View>
             {allExpenses.map((ele,i)=>{
               return(
                 <Text key={ele._id}>{ele._id}</Text>
               )
             })}
             {/* <Text>id: </Text> */}
            </View>

          


        </SafeAreaView>
            
        
    )
    }


    export default ShowExpensePage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})