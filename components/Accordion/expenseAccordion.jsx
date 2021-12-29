// flexbox for pricing component 
// category in accordion box? 
// spacing for accordion with graph 
// BE used to filter specific data 
// width to stretch even with short desc

import React from 'react';
import { useState,useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box, Divider, Pressable } from 'native-base';
import { createNavigatorFactory } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const _ = require('underscore')

  const styles = StyleSheet.create({
    entryWrapper: {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor:'blue'
    },
    entryDesc: {
        flex: 1,
        color:'#424642',
        // backgroundColor:'green',
    },
    entryPrice: {
        flex: 1,
        textAlign:'right',
        color:'#424642'
        // backgroundColor:'yellow'
    },
    divider:{
        backgroundColor:'#D8D8D8',
    }


})


function AccordionComponent() {

const {monthContext,expenseMonthContext,userContext} = useContext(DataContext);
const [expenseMonth,setExpenseMonth] = monthContext
const [fetchedExpenseEntries,setFetchedExpenseEntries] = expenseMonthContext
const [user, setUser] = userContext



const fetchExpenses = () => {
  const userid = user
  const monthOfExpense = moment(expenseMonth, moment.ISO_8601).format('YYYY-MM')
  // console.log('monthofexpense:',monthOfExpense)
  fetch(`https://roundup-api.herokuapp.com/data/expense/user/${userid}/${monthOfExpense}`)
  .then(data=>data.json())
  .then((parsedData)=>{
  // console.log('parseddata:',parsedData)
  setFetchedExpenseEntries(parsedData)})
  .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    fetchExpenses()
  },[expenseMonth])

const navigation = useNavigation()

// grouping logic
const entriesByDay = _(fetchedExpenseEntries).groupBy((element)=>{
  const groupedDate = element.expensesentry.date
  const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('YYYY-MM-DD')
  return formattedGroupedDate
})

// console.log('entriesbyday:',entriesByDay)
const allDates = Object.keys(entriesByDay)

const entries = allDates.map((date,index)=>{

// method for calculating total amount for each day
let totalAmount = 0
entriesByDay[date].forEach((entry)=>{
    totalAmount += entry.expensesentry.amount
})

return(
<Accordion.Item key={index}>
    <Accordion.Summary _expanded={{backgroundColor:'#DFD3C3'}}>
    {date}
    {`$ ${totalAmount}`}
    {/* <Accordion.Icon />  */}
    </Accordion.Summary>
    {entriesByDay[date].map((entry,index)=>{
    return(
    <Pressable style={styles.pressable} onPress={() => navigation.navigate('Show Expense Page', {entry})}>
    <Accordion.Details key={index}>
        <Text style={styles.entryDesc}>{entry.expensesentry.description}</Text>
        <Text style={styles.entryPrice}>{`$ ${entry.expensesentry.amount}`}</Text>
    <Divider my={2} style={styles.divider}/>
    </Accordion.Details>
    </Pressable>
    )})}
</Accordion.Item>
)
})

return (
    <Box>
    <Accordion index={[0]}>
    {entries}
    </Accordion>
    </Box>
    )
}

 
export default function AccordionList () {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionComponent/>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}