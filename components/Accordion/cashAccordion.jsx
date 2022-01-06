import React from "react";
import { useState, useEffect, useContext } from "react";
import DataContext from "../../context/DataContext";
import { ScrollView } from "react-native";
import {
  Accordion,
  NativeBaseProvider,
  Center,
  Box,
  Text,
  Pressable,
  HStack,
  Divider,
} from "native-base";
import { createNavigatorFactory } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const _ = require("underscore");

function AccordionComponent({setTotal}) {
  const {
    monthContext,
    cashMonthContext,
    userContext,
    expenseForceRenderContext,
  } = useContext(DataContext);
  const [selectedMonth, setSelectedMonth] = monthContext;
  const [fetchedCashEntries, setFetchedCashEntries] = cashMonthContext;
  const [user, setUser] = userContext;
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;

  const fetchCash = () => {
    const userid = user;
    const monthOfCash = moment(selectedMonth, moment.ISO_8601).format(
      "YYYY-MM"
    );
    // console.log('monthofcash:',monthOfCash)
    fetch(
      `https://roundup-api.herokuapp.com/data/cash/user/${userid}/${monthOfCash}`
    )
      .then((data) => data.json())
      .then((parsedData) => {
        // console.log('parseddata:',parsedData)
        setFetchedCashEntries(parsedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCash();
    //console.log("cash gp loaded");
  }, [selectedMonth, expenseForceRender]);

  const navigation = useNavigation();

  // grouping logic
  // console.log('fetchedcashsentries:',fetchedCashEntries)
  const entriesByDay = _(fetchedCashEntries).groupBy((element) => {
    const groupedDate = element.cashentry.date;
    const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format(
      "YYYY-MM-DD"
    );
    return formattedGroupedDate;
  });

  // console.log('entriesbyday:',entriesByDay)
  // const allDates = Object.keys(entriesByDay)
  const allDatesAscending = Object.keys(entriesByDay).sort();
  const allDates = allDatesAscending.reverse();
  // console.log('alldates:',allDates)

  let monthlyAmount = 0;
  for (let dataEntry in entriesByDay) {
    entriesByDay[dataEntry].forEach((entry) => {
      monthlyAmount += entry.cashentry.amount;
    });
    setTotal(monthlyAmount);
  }
  
  const checkDivider = (index) => {
    if (index % 2 == 0) {
      return "white";
    } else {
      return "coolGray.100";
    }
  };

  const entries = allDates.map((date, index) => {
    // method for calculating total amount for each day
    let totalAmount = 0;
    entriesByDay[date].forEach((entry) => {
      totalAmount += entry.cashentry.amount;
    });

    return (
      <Accordion.Item key={index}>
        <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          <HStack width="100%" justifyContent="space-between">
            <Text fontWeight="bold">{date}</Text>
            <Text fontWeight="bold">{`$ ${totalAmount}`}</Text>
          </HStack>
        </Accordion.Summary>
        {entriesByDay[date].map((entry, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("Show Cash Page", { entry })
              }
            >
              <Accordion.Details key={index} bgColor={checkDivider(index)}>
                <HStack width="100%" justifyContent="space-between">
                  <Text>{entry.cashentry.description}</Text>
                  <Text>{`$ ${entry.cashentry.amount}`}</Text>
                </HStack>
              </Accordion.Details>
            </Pressable>
          );
        })}
      </Accordion.Item>
    );
  });

  return (
    <Box>
      <Accordion index={[0]}>{entries}</Accordion>
    </Box>
  );
}

export default function AccordionList({ setTotal }) {

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionComponent setTotal={setTotal} />
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
