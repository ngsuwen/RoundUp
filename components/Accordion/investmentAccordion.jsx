import React from 'react';
import { useContext } from 'react'
import DataContext from '../../context/DataContext';
import { ScrollView} from 'react-native';
import { Accordion, Text, NativeBaseProvider, Center, Box, Pressable, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const _ = require('underscore')

function AccordionComponent() {

const {investmentContext, selectedTickerAndPriceContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [selectedTickerAndPrice,setSelectedTickerAndPrice] = selectedTickerAndPriceContext

// array of objects containing transaction data
const transactionHistory = fetchedInvestmentEntries[selectedTickerAndPrice.ticker]
const entriesByDay = _(transactionHistory).groupBy((element)=>{
const groupedDate = element.investmentsentry.date
const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format('YYYY-MM-DD')
return formattedGroupedDate
})

const checkDivider = (index) => {
  if (index % 2 == 0) {
    return "white";
  } else {
    return "coolGray.100";
  }
};

// sorting the dates by lastest first (at the top)
const allDatesAscending = Object.keys(entriesByDay).sort()
const allDates = allDatesAscending.reverse()


const navigation = useNavigation()


const entries = allDates.map((date,index)=>{
  return(
    <Accordion.Item key={index}>
        <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300"}}>
        <Text fontWeight="bold">{date}</Text>
        <Accordion.Icon color="black" size="5"/> 
        </Accordion.Summary>
        {entriesByDay[date].map((entry,index2)=>{
        return(
        <Pressable key={index2} onPress={() => navigation.navigate('Show Investment Page', {entry})}>
        <Accordion.Details key={index} bgColor={checkDivider(index2)}>
        <HStack width="100%" justifyContent="space-between">
            <Text >{entry.investmentsentry.transaction}</Text>
            <Text >Quantity: {entry.investmentsentry.quantity}</Text>
            <Text >Price: {`$${entry.investmentsentry.price}`}</Text>
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