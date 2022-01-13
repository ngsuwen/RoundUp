// note that investment chart will only update the next day as market data for consolidatino is fetched daily

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
const [dataPoints,setDataPoints] = useState([0,0,0,0,0,0,0])

useEffect(()=>{
    reloadExpenses()
},[fetchedInvestmentEntries])

const reloadExpenses = () => {

  try{
  // grouping logic
  const tickerList = Object.keys(fetchedInvestmentEntries) 
  // console.log('tickerlistatlinechartdaily:',tickerList)
  // console.log('fetchedinvestmententrylienchartdaily',fetchedInvestmentEntries)

  // calculating total amount of everything (stocks and crypto combined)


   // setting up arr of obj for y-axis data to be matched and injected 
   const yAxisDataArr = allLabels.map(date=>{
    return {
      'date':date,
      'totalAmount':0
    }
    })

  // have to make sure there's pricehistory for the txn you're getting as priceHistory will be empty for newly added entries
  for(let i = 0;i < tickerList.length;i++){
    const dateDataPoints = fetchedInvestmentEntries[tickerList[0]][0]['priceHistory'].slice(-7).map(priceHistoryDataPoint => moment(priceHistoryDataPoint['date']).format('DD-MMM')) // index 0 of the first ticker as that will give the longest date data point
    // console.log('datedatapoints:',dateDataPoints)
    // set x-axis
    setAllLabels(dateDataPoints)
    
    // console.log('yaxisdatarr:',yAxisDataArr)
   
    // need to get qty * price for the last 7 days to calculate totalstocksandcryptoamount

    fetchedInvestmentEntries[tickerList[i]][0]['priceHistory'].slice(-7).forEach((priceHistoryEntryForOneDay,index)=>{
      // reusing the same transaction from above i and j nested loop as we need just one txn. for each day of the txn. 
      // console.log('priceHistoryEntry:',priceHistoryEntry) // contains date,price,quantity for one particular date
      // console.log('ticker data 2:',tickerList[i], 'total amount:',priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity)
      // totalStocksAndCryptoAmountForOneDay += priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity // calculating and adding the total stock/crypto amount for that one day for this stock. Entire loop will add all stocks/crypto into totalStocksAndCryptoAmountForOneDay. 
      // console.log('totalbeforerounding:',totalStocksAndCryptoAmountForOneDay)
      // console.log(`
      // ticker: ${tickerList[i]},
      // date: ${moment(priceHistoryEntryForOneDay['date']).format('MM:SS')},
      // amount: ${priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity}
      // `)
      // console.log('totalafterrounding:',Math.round(totalStocksAndCryptoAmountForOneDay))

      for(let date of yAxisDataArr){
        if(date['date'] == moment(priceHistoryEntryForOneDay['date']).format('DD-MMM')){
          date['totalAmount'] += priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity
        }
      }

      console.log('yaxisdataarr:',yAxisDataArr)

      // yAxisDataArr.forEach(date=>{
      //   console.log('x-axis date:',date['date'],'y-axis date:',moment(priceHistoryEntryForOneDay['date']).format('DD-MMM'))
      // })

      // yAxisDataArr[] += Math.round(totalSto`cksAndCryptoAmountForOneDay) // for each day of the txn of every ticker, we add it to the respective total amount for that day in yAxisDataArr. Loops thru all the days firstly for each ticker and subsequently for all tickers
      // console.log('yAXis:',yAxisDataArr)
    })}

  // console.log('yAXis:',yAxisDataArr)
  setDataPoints(yAxisDataArr)
  // console.log('datapts:',dataPoints)

  }
  catch(err){
    console.log(err)
  }

 
  }


  const linedata = {
      labels: allLabels,
      datasets: [
        {
          data: dataPoints?dataPoints:[0,0,0,0,0,0,0],
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

  // set comma for y-axis values over 1000
  const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
        <LineChart
            data={linedata}
            width={screenWidth}
            height={screenHeight*0.25}
            chartConfig={chartConfig}
            bezier
            formatYLabel={(data)=>numberWithCommas(Math.round(data))}
        />
  )}


 