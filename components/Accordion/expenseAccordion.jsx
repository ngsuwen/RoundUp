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

function AccordionComponent() {
  const {
    monthContext,
    expenseMonthContext,
    userContext,
    expenseForceRenderContext,
  } = useContext(DataContext);
  const [selectedMonth, setSelectedMonth] = monthContext;
  const [fetchedExpenseEntries, setFetchedExpenseEntries] = expenseMonthContext;
  const [user, setUser] = userContext;
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;

  const fetchExpenses = () => {
    const userid = user;
    const monthOfExpense = moment(selectedMonth, moment.ISO_8601).format(
      "YYYY-MM"
    );
    // console.log('monthofexpense:',monthOfExpense)
    fetch(
      `https://roundup-api.herokuapp.com/data/expense/user/${userid}/${monthOfExpense}`
    )
      .then((data) => data.json())
      .then((parsedData) => {
        // console.log('parseddata:',parsedData)
        setFetchedExpenseEntries(parsedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchExpenses();
    //console.log("expense gp loaded");
  }, [selectedMonth, expenseForceRender]);

  const navigation = useNavigation();

  // grouping logic
  // console.log('fetchedexpensesentries:',fetchedExpenseEntries)
  const entriesByDay = _(fetchedExpenseEntries).groupBy((element) => {
    const groupedDate = element.expensesentry.date;
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
      totalAmount += entry.expensesentry.amount;
    });

    return (
      <Accordion.Item key={index}>
        <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          <Accordion.Icon color="black" size="5"/>
          <HStack width="90%" justifyContent="space-between">
            <Text fontWeight="bold">{date}</Text>
            <Text fontWeight="bold">{`$ ${totalAmount}`}</Text>
          </HStack>
        </Accordion.Summary>
        {entriesByDay[date].map((entry, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("Show Expense Page", { entry })
              }
            >
              <Accordion.Details key={index} bgColor={checkDivider(index)}>
                <HStack width="100%" justifyContent="space-between">
                  <Text pl={"10%"}>{entry.expensesentry.description}</Text>
                  <Text>{`$ ${entry.expensesentry.amount}`}</Text>
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
      {allDates.length>0?
      <Accordion index={[0]}>{entries}</Accordion>
      : <Text>No entries yet</Text>}
    </Box>
  );
}

export default function AccordionList() {

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccordionComponent />
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
