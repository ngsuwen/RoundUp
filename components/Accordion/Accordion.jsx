import React from 'react';
import { ScrollView } from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box } from 'native-base';
import { createNavigatorFactory } from '@react-navigation/native';
const _ = require('underscore')


const cashentry = [
    {
      date: '01/01/22',
      amount: 10,
      category: 'food',
      desc:'A cup of coffee and a lot of christmas present and maybe for new year as well'
    },
    {
      date: '01/01/22',
      amount: 10,
      category: 'food',
      desc:'A cup of coffee and a lot of christmas present and maybe for new year as well'
    },
    {
      date: '01/01/22',
      amount: 10,
      category: 'food',
      desc:'A cup of coffee and a lot of christmas present and maybe for new year as well'
    },
    {
      date: '02/01/22',
      amount: 10,
      category: 'food',
      desc:'A cup of coffee and a lot of christmas present and maybe for new year as well'
    },
    {
      date: '03/01/22',
      amount: 10,
      category: 'food',
      desc:'A cup of coffee and a lot of christmas present and maybe for new year as well'
    },
  ]
  

// grouping logic

const entriesByDay = _.groupBy(cashentry,'date')
// console.log('entriesbyday',entriesByDay)
// output is {[{}]} object with date wrapping arrays (one arr for each date) wrapping object (amount,date,desc)
const allDates = Object.keys(entriesByDay)

// const totalAmountForDay = allDates.map((date)=>{
//     let totalAmount = 0
//     entriesByDay[date].forEach((entry)=>{
//       totalAmount += entry.amount
//     })
//     return totalAmount
//   })

// const objForEachEntry = allDates.map((date)=>{
//     const allDailyEntries = entriesByDay[date].map((entry)=> {return entry})
//     return allDailyEntries
//   })

function AccordionComponent() {

const entries = allDates.map((date)=>{
return(
<Accordion.Item>
    <Accordion.Summary>
    {date}
    <Accordion.Icon /> 
    {/* replace icon with total amount  */}
    </Accordion.Summary>
    {entriesByDay[date].map((entry)=>{
    return(
    <Accordion.Details>
    {entry.amount}
    {entry.desc}
    </Accordion.Details>
    )})}
</Accordion.Item>
)
})

return (
    <Box m={3}>
    <Accordion index={[0, 1]}>
    {entries}
    </Accordion>
    </Box>
    )
}

 
export default function AccordionList () {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView>
          <AccordionComponent />
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}