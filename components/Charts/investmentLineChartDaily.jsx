// change the x-axis data point to past 7 days 

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

  // calculating total amount of everything (stocks and crypto combined)


  let yAxisDataArr = [0,0,0,0,0,0,0] // putting 0 for the 7 days so we can reference the index later on

  // have to make sure there's pricehistory for the txn you're getting as priceHistory will be empty for newly added entries
  for(let i = 0;i < tickerList.length;i++){
    for(let j = 0; j < 100; j++){ // upper limit of 100 transactions -> need to edit to be length of total txn for each ticker 
      if(fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].length >= 1){ // we just need 1 transaction with at least the latest 7 transactions (from the back)
      const dateDataPoints = fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].slice(-7).map(priceHistoryDataPoint => moment(priceHistoryDataPoint['date']).format('DD-MMM'))
      // console.log('datedatapoints:',dateDataPoints)
      // set x-axis
      setAllLabels(dateDataPoints)


      // need to get qty * price for the last 7 days to calculate totalstocksandcryptoamount
      let totalStocksAndCryptoAmountForOneDay = 0 
      fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].slice(-7).forEach((priceHistoryEntryForOneDay,index)=>{ // reusing the same transaction from above i and j nested loop as we need just one txn. for each day of the txn. 
        // console.log('priceHistoryEntry:',priceHistoryEntry) // contains date,price,quantity for one particular date
        // console.log('ticker data 2:',tickerList[i], 'total amount:',priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity)
        totalStocksAndCryptoAmountForOneDay += priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity // calculating and adding the total stock/crypto amount for that one day for this stock. Entire loop will add all stocks/crypto into totalStocksAndCryptoAmountForOneDay. 

        yAxisDataArr[index] += totalStocksAndCryptoAmountForOneDay // for each day of the txn of every ticker, we add it to the respective total amount for that day in yAxisDataArr. Loops thru all the days firstly for each ticker and subsequently for all tickers
      })

      // stop loop
      break // break the loop as we just need 1 datapoint for each ticker 
      }
    } // this will continue looping thru the rest of the tickers to get 1 transaction with at least 7 latest transactions each
  }

  setDataPoints(yAxisDataArr)

  }
  catch(err){
    console.log(err)
  }

 
  }




    const linedata = {
        labels: allLabels,
        datasets: [
          {
            data: dataPoints,
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


 