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
  const { expenseContext, expenseEntryContext } = useContext(DataContext);
  const [allExpense, reloadExpense] = expenseContext;
  const [date,setDate, onChangeDate, amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext

  const {entry} = route.params;

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
    navigation.navigate("Expense GP");
  };

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
            onPress={() => {navigation.navigate("Edit Expense Page", {entry})
            
              //need to figure out how to update date to edit page
              //const convDate = entry.expensesentry.date.toString()
              //setDate(convDate)
              // need to convert amount to string to render on amount field in edit expense page
              // below codes needed to auto populate the fields in edit page
              const convAmount = JSON.stringify(entry.expensesentry.amount)
              setAmount(convAmount)
              setSelectedValue(entry.expensesentry.category)
              setDescription(entry.expensesentry.description)
              
            }
            }
          />
          <Button
            title="Back"
            onPress={() => navigation.navigate("Expense GP")}
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


  