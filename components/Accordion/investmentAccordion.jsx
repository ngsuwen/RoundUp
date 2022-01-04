// category in accordion box? 
// new entry not opened up after creation (bonus)

import React from 'react';
import { useState,useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext';
import { ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box, Divider, Pressable } from 'native-base';
import { createNavigatorFactory } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const _ = require('underscore')

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

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
        width:screenWidth*0.8,
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


function AccordionComponent(props) {

const { investmentContext, userContext, investmentMonthContext,investmentTickerContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [investmentMonth,setInvestmentMonth] = investmentMonthContext
const [tickerData,setTickerData] = investmentTickerContext
const [user, setUser] = userContext


const RenderTransactionHistory = () => {
  // array of objects containing transaction data
  const transactionHistory = fetchedInvestmentEntries[props.selectedTickerAndPrice.ticker]
  const entriesByDay = _(transactionHistory).groupBy((element)=>{
  const groupedDate = element.investmentsentry.date
  const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('YYYY-MM-DD')
  return formattedGroupedDate
})
  // console.log('entriesbyday:',entriesByDay)

  // sorting the dates by lastest first (at the top)
  const allDatesAscending = Object.keys(entriesByDay).sort()
  const allDates = allDatesAscending.reverse()

  let totalStockQty = 0
  let totalAmtPaid = 0
  const entries = allDates.map((date,index)=>{
  // method for calculating total stock qty & total amount paid for each day
  entriesByDay[date].forEach((entry)=>{
      if(entry.investmentsentry.transaction === 'Buy'){
        totalStockQty += entry.investmentsentry.quantity
      }
      if(entry.investmentsentry.transaction === 'Sell'){
        totalStockQty -= entry.investmentsentry.quantity    
      }
  })
  })
  const monthOfExpense = moment(investmentMonth, moment.ISO_8601).format('YYYY-MM')

   
  // do this last when you have all info
  setTickerData(
    {'totalstockqty:':totalStockQty,
     'totalamountpaid:':totalAmtPaid,
     'totalprofits':totalProfits,
    })
}

useEffect(()=>{
  const resetPage = navigation.addListener("focus", ()=>{
  // resetting ticker data
  setTickerData([])
  RenderTransactionHistory()
  console.log('transaction history rendered')
    })
    return resetPage
},[investmentMonth])

const navigation = useNavigation()


// return(
// <Accordion.Item key={index}>
//     <Accordion.Summary _expanded={{backgroundColor:'#DFD3C3'}}>
//     {date}
//     {`$ ${totalAmount}`}
//     {/* <Accordion.Icon />  */}
//     </Accordion.Summary>
//     {entriesByDay[date].map((entry,index)=>{
//     return(
//     <Pressable style={styles.pressable} onPress={() => navigation.navigate('Show Expense Page', {entry})}>
//     <Accordion.Details key={index}>
//         <Text style={styles.entryDesc}>{entry.expensesentry.description}</Text>
//         <Text style={styles.entryPrice}>{`$ ${entry.expensesentry.amount}`}</Text>
//     <Divider my={2} style={styles.divider}/>
//     </Accordion.Details>
//     </Pressable>
//     )})}
// </Accordion.Item>
// )
// })

return (
    <Box>
    <Accordion index={[0]}>
    {/* {entries} */}
    </Accordion>
    </Box>
    )
}

 
export default function AccordionList (props) {

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionComponent selectedTickerAndPrice={props.selectedTickerAndPrice}/>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}