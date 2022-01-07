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
  for(let i = 0;i < 100;i++){
    for(let j = 0; j < 100; j++){
      if(fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].length >= 7){
      const dateDataPoints = fetchedInvestmentEntries[tickerList[i]][j]['priceHistory'].slice(-5).map(priceHistoryDataPoint => moment(priceHistoryDataPoint['date']).format('HH:mm'))
      console.log('datedatapoints:',dateDataPoints)
      // set x-axis
      setAllLabels(dateDataPoints)
      // stop loop
      break
      }
    }
    break
  }



  // tickerList.forEach((ticker)=>{
  //   const priceHistoryData = fetchedInvestmentEntries[ticker][0]['priceHistory'].slice(-5) // extracts the last 5 data point for the first transaction of every ticker (only the first txn is needed as all transaction has the same priceHistory data written into them)
  //   // console.log('priceHistoryData:',priceHistoryData)
  // })

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


 