import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit'
import DataContext from '../../context/DataContext'
const _ = require('underscore')
 

export default function PieChartComponent() {

const {cashMonthContext,monthContext} = useContext(DataContext)
const [fetchedCashEntries,setFetchedCashEntries] = cashMonthContext
const [cashMonth,setCashMonth] = monthContext
const [allLabels,setAllLabels] = useState([])
const [dataPoints,setDataPoints] = useState([0])
const [chartData,setChartData] = useState([])


useEffect(()=>{
reloadExpenses()
},[fetchedCashEntries])

useEffect(()=>{
setChartDataFunction()
},[dataPoints])


const reloadExpenses = () => {
  // grouping logic
  const entriesByCategory = _(fetchedCashEntries).groupBy((element)=>{
    return element.cashentry.category
  })

  // console.log('entriesbycategory:',entriesByCategory)
  const allCategories = Object.keys(entriesByCategory) // -> this is labels
  setAllLabels(allCategories)

  const totalAmountArr = allCategories.map((category)=>{
  // method for calculating total amount for each day
  let totalAmount = 0
  entriesByCategory[category].forEach((entry)=>{
  totalAmount += entry.cashentry.amount
  })
  return totalAmount
  })

  // console.log('totalamountarr:',totalAmountArr)
  // console.log('monthContext',monthContext)


  // this condition is required because if array is empty, react-chart-kit will return invalid number error
  if(totalAmountArr.length>0){
    setDataPoints(totalAmountArr)
  }else{
    setDataPoints([100])
    setAllLabels([''])
  }
  }
  
  const setChartDataFunction = () =>{
  let chartDataArr = []

  for(let i=0;i<allLabels.length;i++){
    let colorArr = ['#ada7ff','#8e94f2','#8187dc','#cbb2fe','#e0c3fc','#8187DA'] // hard code by number of categories so each category has unique colors 
    chartDataArr.push(    
    {
      name: allLabels[i], 
      population: dataPoints[i], 
      color: colorArr[i],
      legendFontColor: '#7F7F7F', 
      legendFontSize: 12
    })
  }

  setChartData(chartDataArr)
  // console.log('chartdata:',chartData)
  // console.log('monthContext',monthContext)
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
        <PieChart
            data={chartData}
            width={screenWidth}
            height={screenHeight*0.25}
            chartConfig={chartConfig}
            accessor="population"
            style={{
              marginLeft: 10,
            }}
            backgroundColor="transparent"
        />
  )

}


  