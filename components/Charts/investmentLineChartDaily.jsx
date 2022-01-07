import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit'
import DataContext from '../../context/DataContext'
import moment from 'moment'
 

export default function investmentLineChartComponent() {

const { investmentContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [allLabels,setAllLabels] = useState([])
const [dataPoints,setDataPoints] = useState([0])

useEffect(()=>{
    reloadExpenses()
},[fetchedInvestmentEntries])

const reloadExpenses = () => {

  try{
  // grouping logic
  const tickerList = Object.keys(fetchedInvestmentEntries)
  console.log('tickerlistatlinechartdaily:',tickerList)
  // console.log('fetchedinvestmententrylienchartdaily',fetchedInvestmentEntries)
  
  // have to make sure there's pricehistory for the txn you're getting as priceHistory will be empty for newly added entries
  for(let i = 0;i < 100;i++){ // upper limit of 100 tickers
    for(let j = 0; j < 100; j++){ // upper limit of 100 transactions
      if(fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].length >= 7){ // we just need 1 transaction with at least the latest 7 transactions (from the back)
      const dateDataPoints = fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].slice(-7).map(priceHistoryDataPoint => moment(priceHistoryDataPoint['date']).format('HH:mm'))
      // console.log('datedatapoints:',dateDataPoints)
      // set x-axis
      setAllLabels(dateDataPoints)

      // calculating total amount of everything (stocks and crypto combined)
      let totalStocksAndCryptoAmount = 0 
      // need to get qty * price for the last 7 days 
      fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].slice(-7).forEach((priceHistoryEntry)=>{
        console.log('ticker data 2:',tickerList[i], 'total amount:',priceHistoryEntry.price * priceHistoryEntry.quantity)
        totalStocksAndCryptoAmount += priceHistoryEntry.price * priceHistoryEntry.quantity
      })
      

      // stop loop
      break // break the loop as we just need 1 datapoint for each ticker 
      }
    } // this will continue looping thru the rest of the tickers to get 1 transaction with at least 7 latest transactions each
  }






  }
  catch(err){
    console.log(err)
  }

  
 
  }




    const linedata = {
        labels: allLabels,
        datasets: [
          {
            data: [20, 25, 21, 30, 50, 70, 100],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ]
      }

  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(163, 71, 165, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }

  return (
        <LineChart
            data={linedata}
            width={screenWidth}
            height={screenHeight*0.25}
            chartConfig={chartConfig}
            bezier
        />
  )}


 