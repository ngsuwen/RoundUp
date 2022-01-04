// new entry not opened up after creation (bonus)
// why is tickerandprice state rerendered?  A: is it because the whole show ticker page reloaded
// check if investment accordion is reloaded when selectedmonth is changed? NO
// for this page, we cannot fetch investment record per month as we will need all data to calculate p/l. Hence we shall only filter all the data per month selected.

import React from 'react';
import { useState,useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext';
import { ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box, Divider, Pressable, Icon } from 'native-base';
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

const {investmentContext, userContext ,investmentTickerContext,tickerAndPriceContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [tickerAndPrice,setTickerAndPrice] = tickerAndPriceContext
const [tickerData,setTickerData] = investmentTickerContext
const [user, setUser] = userContext

// array of objects containing transaction data
const transactionHistory = fetchedInvestmentEntries[props.selectedTickerAndPrice.ticker]
const entriesByDay = _(transactionHistory).groupBy((element)=>{
const groupedDate = element.investmentsentry.date
const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('YYYY-MM-DD')
return formattedGroupedDate
})

// sorting the dates by lastest first (at the top)
const allDatesAscending = Object.keys(entriesByDay).sort()
const allDates = allDatesAscending.reverse()

// console.log('entriesbyday:',entriesByDay)

const RenderTransactionHistory = () => {

// avg price per stock, needed to find new totalAmountPaid
// cost basis for one BUY transaction can be derived by price bought * qty
// to get a moving cost basis, we need to get the average of all costBasis up to that buy transaction

let costBasis = 0

// for every SELL txn, we need minus costBasis * qty sold off from total amount paid to find total amount paid for remaining qty of shares
let totalAmountPaid = 0

let currentStockQty = 0


///// TO FIND UNREALIZED P/L /////

// HANDLING SELL/BUY TXN
// for every SELL txn:
// 1) get new totalAmountPaid [totalAmountPaid -= qtysold * current costBasis till that transaction]
// 2) update total qty of stocks left [currentStockQty -= qtysold]
// cost basis does not change when you sell because ratio of totalAmountPaid being minus/totalqty decreased will be a constant 

// for every BUY txn:
// 1) update totalAmountPaid [totalAmountPaid += buy in price * qty bought]
// 2) update total qty of stocks left [currentStockQty += qtybought]
// 3) update cost basis [totalAmountPaid/currentStockQty]

// Finally to get unrealized P/L, 
// loop through the whole list in chronological order and then use the formula as follows: 
// unrealizedPL = currentStockQty*currentprice - totalAmountPaid


const stockDataCalculationFunction = allDates.map((date,index)=>{
entriesByDay[date].forEach((entry,index)=>{ // will have to use loop instead of (for txn of arr) in order to access the index. index is needed to single out the first buy in price to not get the average of the first buy in price. index 1 onwards will have to be divided by 2, but not index 0. 
console.log('entriesbydate:',entriesByDay[date])
 if(entry.investmentsentry.transaction==='Buy'){
    totalAmountPaid+=entry.investmentsentry.price*entry.investmentsentry.quantity
    currentStockQty+=entry.investmentsentry.quantity
    
    // update cost basis after totalAmountPaid and currentStockQty is updated 
    if (index === 0){
        costBasis=entry.investmentsentry.price
    }
    else{
        costBasis=totalAmountPaid/currentStockQty // this statement is not true for the first transaction 
    }
 }
 if(entry.investmentsentry.transaction==='Sell'){
    totalAmountPaid-=entry.investmentsentry.quantity*costBasis
    currentStockQty-=entry.investmentsentry.quantity

  }   
})
})

// assuming current price is $20 (from API)
let unrealizedPL = (currentStockQty*props.selectedTickerAndPrice.value)-totalAmountPaid

// console.log('costBasis:',costBasis)
// console.log('totalAmountPaid:',totalAmountPaid)
// console.log('currentstockqty:',currentStockQty)
// console.log('unrealized P/L:',unrealizedPL)

// linking to cash page
// for all sell transactions, to add into cash balance 
// for all buy transactions, to deduct from cash balance 


  // const monthOfExpense = moment(investmentMonth, moment.ISO_8601).format('YYYY-MM')

   
  // do this last when you have all info
  setTickerData(
    {
     'ticker':props.selectedTickerAndPrice.ticker,
     'currentPrice':props.selectedTickerAndPrice.value,
     'costBasis:':costBasis,
     'currentStockQty:':currentStockQty,
     'totalAmountPaid:':totalAmountPaid,
     'unrealizedPL':unrealizedPL,
    })

    console.log('tickerData:',tickerData)
}

useEffect(()=>{
  const resetPage = navigation.addListener("focus", ()=>{
  // resetting ticker data
  setTickerData([])
  RenderTransactionHistory()
  console.log('transaction history rendered')
    })
    return resetPage
},[tickerAndPrice,tickerData,fetchedInvestmentEntries])

const navigation = useNavigation()


const entries = allDates.map((date,index)=>{
  return(
    <Accordion.Item key={index}>
        <Accordion.Summary _expanded={{backgroundColor:'#DFD3C3'}}>
        {date}
        <Accordion.Icon /> 
        </Accordion.Summary>
        {entriesByDay[date].map((entry,index)=>{
        return(
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('Show Expense Page', {entry})}>
        <Accordion.Details key={index}>
            <Text style={styles.entryDesc}>Transaction: {entry.investmentsentry.transaction}</Text>
            <Text style={styles.entryDesc}>No. of units: {entry.investmentsentry.quantity}</Text>
            <Text style={styles.entryPrice}>Price: {`$ ${entry.investmentsentry.price}`}</Text>
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