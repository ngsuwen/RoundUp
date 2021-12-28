import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit'
import { useState, useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext'
import moment from 'moment'
const _ = require('underscore')
 

export default function expenseLineChartComponent() {

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

const {expenseMonthContext,expenseMonthGroupedByDate} = useContext(DataContext)
const [fetchedExpenseEntries,setFetchedExpenseEntries] = expenseMonthContext
const [allLabels,setAllLabels] = useState([])
const [dataPoints,setDataPoints] = useState([0])


useEffect(()=>{
reloadExpenses()
},[fetchedExpenseEntries])


const reloadExpenses = () => {
// grouping logic
const entriesByDay = _(fetchedExpenseEntries).groupBy((element)=>{
  const groupedDate = element.expensesentry.date
  const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('DD')
  return formattedGroupedDate
})

// console.log('entriesbyday:',entriesByDay)
const allDates = Object.keys(entriesByDay).sort((a,b)=>a-b) // -> this is labels
setAllLabels(allDates)

const totalAmountArr = allDates.map((date)=>{
// method for calculating total amount for each day
let totalAmount = 0
entriesByDay[date].forEach((entry)=>{
totalAmount += entry.expensesentry.amount
})
return totalAmount
})

console.log('totalamountarr:',totalAmountArr)

// this condition is required because if array is empty, react-chart-kit will return invalid number error
if(totalAmountArr.length>0){
  setDataPoints(totalAmountArr)
}else{
  setDataPoints([0])
  setAllLabels(['No Data Available'])
}



}


const linedata = {
  labels: allLabels,
  datasets: [
    {
      data: dataPoints?dataPoints:[0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 3 // optional
    }
  ],
  legend: ["Expense"] // optional
}


return (
      <LineChart
          data={linedata}
          width={screenWidth}
          height={screenHeight*0.2}
          chartConfig={chartConfig}
          bezier
      />
)
}


 