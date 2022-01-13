// for this page, we cannot fetch investment record per month as we will need all data to calculate p/l. Hence we shall only filter all the data per month selected.

import React from 'react';
import { useContext,useEffect,useState } from 'react'
import DataContext from '../../context/DataContext';
import { ScrollView, StyleSheet, Text, Dimensions} from 'react-native';
import { Accordion, NativeBaseProvider, Center, Box, Pressable, HStack } from 'native-base';
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


function AccordionComponent() {

const {investmentContext, userContext ,investmentTickerContext,tickerAndPriceContext,selectedTickerAndPriceContext,investmentAccordionForceRenderContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [tickerAndPrice,setTickerAndPrice] = tickerAndPriceContext
const [tickerData,setTickerData] = investmentTickerContext
const [selectedTickerAndPrice,setSelectedTickerAndPrice] = selectedTickerAndPriceContext
const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext
const [user, setUser] = userContext
const [allDatesArr,setAllDatesArr] = useState([])
const [entriesByDayArr,setEntriesByDayArr] = useState([])

const reloadInvestments = () =>{
// array of objects containing transaction data
const transactionHistory = fetchedInvestmentEntries[selectedTickerAndPrice.ticker]
const entriesByDay = _(transactionHistory).groupBy((element)=>{
const groupedDate = element.investmentsentry.date
const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('YYYY-MM-DD')
return formattedGroupedDate
})
setEntriesByDayArr(entriesByDay)
// console.log('ACCORDION state:',entriesByDayArr)


// sorting the dates by lastest first (at the top)
const allDatesAscending = Object.keys(entriesByDay).sort()
const allDates = allDatesAscending.reverse()
setAllDatesArr(allDates)
}

useEffect(()=>{
  const resetPage = navigation.addListener("focus", ()=>{
  reloadInvestments()
    })
  return resetPage
},[fetchedInvestmentEntries])

const navigation = useNavigation()

const checkDivider = (index) => {
  if (index % 2 == 0) {
    return "white";
  } else {
    return "coolGray.100";
  }
};

const entries = allDatesArr.map((date,index)=>{
  return(
    <Accordion.Item key={index}>
        <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300"}}>
        <Text style={{fontWeight:'bold'}}>{date}</Text>
        <Accordion.Icon /> 
        </Accordion.Summary>
        {entriesByDayArr[date].map((entry,index2)=>{
        return(
        <Pressable key={index2} style={styles.pressable} onPress={() => navigation.navigate('Show Investment Page', {entry})}>
        <Accordion.Details key={index} bgColor={checkDivider(index2)}>
        <HStack width="100%" justifyContent="space-between">
            <Text style={styles.entryDesc}>{entry.investmentsentry.transaction}</Text>
            <Text style={styles.entryDesc}>Quantity: {entry.investmentsentry.quantity}</Text>
            <Text style={styles.entryPrice}>Price: {`$${entry.investmentsentry.price}`}</Text>
        </HStack>
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
  const navigation = useNavigation()
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
