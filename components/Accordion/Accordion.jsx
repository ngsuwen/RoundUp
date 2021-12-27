// flexbox for pricing component 
// category in accordion box? 
// spacing for accordion with graph 
// BE used to filter specific data 

import React from 'react';
import { useState,useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box, Divider, Pressable } from 'native-base';
import { createNavigatorFactory } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const _ = require('underscore')


const cashentry = [
    {
      date: '01/01/22',
      amount: 5.55,
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
      amount: 6,
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

// grouping logic
const entriesByDay = _.groupBy(cashentry,'date')
const allDates = Object.keys(entriesByDay)

function AccordionComponent() {

const [fetchedEntries,setFetchedEntries] = useState([])

const fetchExpenses = () => {
  const userid = '61bd9a6c2fcd3b08f3365f75'
  fetch(`https://roundup-api.herokuapp.com/data/expense/user/${userid}`)
  .then(data=>data.json())
  .then((parsedData)=>{
    console.log('parseddata:',parsedData)
    setFetchedEntries(parsedData)})
  .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    // fetchExpenses()
  },[])

const navigation = useNavigation();

const entries = allDates.map((date,index)=>{

// method for calculating total amount for each day
let totalAmount = 0
entriesByDay[date].forEach((entry)=>{
    totalAmount += entry.amount
})

return(
<Accordion.Item key={index}>
    <Accordion.Summary _expanded={{backgroundColor:'#DFD3C3'}}>
    {date}
    {`$ ${totalAmount}`}
    {/* <Accordion.Icon />  */}
    {/* replace icon with total amount  */}
    </Accordion.Summary>
    {entriesByDay[date].map((entry,index)=>{
    return(
    <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
    <Accordion.Details key={index}>
        <Text style={styles.entryDesc}>{entry.desc}</Text>
        <Text style={styles.entryPrice}>{`$ ${entry.amount}`}</Text>
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

 
export default function AccordionList () {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionComponent/>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}