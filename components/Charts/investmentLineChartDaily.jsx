// note that investment chart will only update the next day as market data for consolidation is fetched daily

import React, { useState, useEffect, useContext } from 'react'
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
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


 

   const dateDataPoints = fetchedInvestmentEntries[tickerList[0]][0]['priceHistory'].slice(-7).map(priceHistoryDataPoint => moment(priceHistoryDataPoint['date']).format('DD-MMM')) // index 0 of the first ticker as that will give the longest date data point
   // console.log('datedatapoints:',dateDataPoints)
   // set x-axis
   setAllLabels(dateDataPoints)
   
    // setting up arr of obj for y-axis data to be matched and injected 
    let yAxisDataArr = []

   for(let date of dateDataPoints){
   yAxisDataArr.push({
     date,
     'totalAmount':0
    })
   }

  //  console.log('yaxisdatarr:',yAxisDataArr)

  for(let i = 0;i < tickerList.length;i++){
    // need to get qty * price for the last 7 days to calculate totalstocksandcryptoamount
      fetchedInvestmentEntries[tickerList[i]][0]['priceHistory'].slice(-7).forEach((priceHistoryEntryForOneDay)=>{
      for(let date of yAxisDataArr){
        if(date['date'] == moment(priceHistoryEntryForOneDay['date']).format('DD-MMM')){
          date['totalAmount'] += priceHistoryEntryForOneDay.price * priceHistoryEntryForOneDay.quantity
        }
    }})
    }

      // console.log('yaxisdataarr:',yAxisDataArr)

      // filtering out y-axis data to setstate
      let dataPointsArr = yAxisDataArr.map((dateAndAmount=>{
        return dateAndAmount.totalAmount
      }))

      setDataPoints(dataPointsArr)
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
            width={screenWidth *0.95}
            height={screenHeight*0.25}
            chartConfig={chartConfig}
            bezier
            fromZero={true}
            style={{
              marginTop: 15,
              marginLeft: 20,
            }}
            formatYLabel={(data)=>numberWithCommas(Math.round(data))}
        />
  )}


 