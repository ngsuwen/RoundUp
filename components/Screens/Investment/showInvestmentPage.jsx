import React, { useState, useEffect } from "react";
import moment from 'moment';
import {
  Center,
  NativeBaseProvider,
  Button,
  Text,
  View,
  Pressable,
  Divider,
} from "native-base";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import { Entypo } from "@expo/vector-icons";
import ShowPageCard from "../../Cards/showPageCard";

const ShowInvestmentPage = ({ navigation, route }) => {
  // useContext
  const { expenseForceRenderContext, investmentEntryContext,investmentAccordionForceRenderContext } = useContext(DataContext);
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext
  const [dateInvestment,setDateInvestment,
         priceInvestment,setPriceInvestment,
         categoryInvestment,setCategoryInvestment,
         tickerInvestment,setTickerInvestment, 
         qtyInvestment, setQtyInvestment,
         transaction, setTransaction,
         coin,setCoin,
         stock,setStock,
         filterTextCrypto,setFilterTextCrypto,
         filterTextStock,setFilterTextStock,
         filteredItemsCrypto,filteredItemsStock,
        ] = investmentEntryContext

  const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext

  const {entry} = route.params;

  // format date to "YYYY-MM-DD"
  const actualDate = entry.investmentsentry.date
  const formattedDate = moment(actualDate, moment.ISO_8601).format('YYYY-MM-DD')
  
  // route DELETE
  const deleteInvestment = async (id) => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/investment/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status !== 200) {
      console.error("failed to delete investment");
      return;
    }

    setInvestmentAccordionForceRender(!investmentAccordionForceRender)
    navigation.navigate("Investment");
  };

  //need this to populate editpage with specified fields
  const editHandler=()=>{
    
    setPriceInvestment(entry.investmentsentry.price)
    setCategoryInvestment(entry.investmentsentry.category)
    // Note: cannot use categoryInvestment === "Crypto" as state change will happen only after run thru whole code. So checking with categoryInvestment
    // straightaway will get non-updated value
    entry.investmentsentry.category === "Crypto"  ? setFilterTextCrypto(entry.investmentsentry.ticker)
    : setFilterTextStock(entry.investmentsentry.ticker)
    
    setDateInvestment(entry.investmentsentry.date)
    setQtyInvestment(entry.investmentsentry.quantity)
    setTransaction(entry.investmentsentry.transaction)
    
    navigation.navigate("Edit Investment Page", {entry: entry})
  }



  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="#fff">
        <View
          width="90%"
          paddingRight={4}
          paddingBottom={1}
          alignItems="flex-end"
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Show Ticker Page", {entry: entry});
              setExpenseForceRender(!expenseForceRender);
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
       </View>
       <ShowPageCard heading="Date" body={formattedDate} />
       <Divider width="80%"/>
       <ShowPageCard
          heading="Price"
          body={"$" + entry.investmentsentry.price}
        />
      <Divider width="80%"/>
      <ShowPageCard
          heading="Quantity"
          body={entry.investmentsentry.quantity}
        />
      <Divider width="80%"/>
      <ShowPageCard heading="Transaction" body={entry.investmentsentry.transaction} />
      <Divider width="80%"/>
      <Divider width="80%"/>
      <ShowPageCard heading="Category" body={entry.investmentsentry.category} />
      <Divider width="80%"/>
      <ShowPageCard heading="Ticker" body={entry.investmentsentry.ticker} />

      <Button.Group size="sm" mt="5">
          <Button
            variant="outline"
            bgColor="white"
            colorScheme="light"
            onPress={editHandler}
          >
            <Text >Edit</Text>
          </Button>
          <Button colorScheme="danger" onPress={() => deleteInvestment(entry._id)}>
          <Text>Delete</Text>
          </Button>
        </Button.Group>
      
      </Center>
    </NativeBaseProvider>
  );
};

export default ShowInvestmentPage;
