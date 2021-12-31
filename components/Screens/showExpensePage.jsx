import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const ShowExpensePage = ({ navigation, route }) => {
  // useContext
  const { expenseContext, expenseForceRenderContext , expenseEntryContext } = useContext(DataContext);
  const [allExpense, reloadExpense] = expenseContext;
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext
  const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext

  const {entry} = route.params;
  

// parse a date in yyyy-mm-dd format
const parseDate = (input) =>{
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]) ; // months are 0-based
}



  // route DELETE
  const deleteExpense = async (id) => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/expense/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status !== 200) {
      console.error("failed to delete expense");
      return;
    }

    reloadExpense();
    setExpenseForceRender(!expenseForceRender)
    navigation.navigate("Expense GP");
  };

  //need this to populate editexpensepage with specified fields
  const editHandler=()=>{
    setAmount(entry.expensesentry.amount)
    setDescription(entry.expensesentry.description)
    setDate(entry.expensesentry.date)
    setSelectedValue(entry.expensesentry.category)
    navigation.navigate("Edit Expense Page", {entry: entry})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Id: {entry._id}</Text>
        <Text>Username: {entry.username}</Text>
        <Text>Date: {entry.expensesentry.date}</Text>
        <Text>Amount: $ {entry.expensesentry.amount}</Text>
        <Text>Category: {entry.expensesentry.category}</Text>
        <Text>Description: {entry.expensesentry.description}</Text>
        <View style={styles.button}>
          <Button title="Delete" onPress={() => deleteExpense(entry._id)} />
          <Button
            title="Edit"
            onPress={editHandler}
          />
          <Button
            title="Back"
            onPress={() => {navigation.navigate("Expense GP")
            setExpenseForceRender(!expenseForceRender)}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShowExpensePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  button:{
    flexDirection: "row",
  alignSelf: "center"  }
});


  