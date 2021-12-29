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
  const { expenseContext } = useContext(DataContext);
  const [allExpense, reloadExpense] = expenseContext;

  const {ele} = route.params;


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
    navigation.navigate("Index Expense Page");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Id: {ele._id}</Text>
        <Text>Username: {ele.username}</Text>
        <Text>Date: {ele.expensesentry.date}</Text>
        <Text>Amount: $ {ele.expensesentry.amount}</Text>
        <Text>Category: {ele.expensesentry.category}</Text>
        <Text>Description: {ele.expensesentry.description}</Text>
        <View style={styles.button}>
          <Button title="Delete" onPress={() => deleteExpense(ele._id)} />
          <Button
            title="Edit"
            onPress={() => navigation.navigate("Edit Expense Page", {ele})}
          />
          <Button
            title="Back"
            onPress={() => navigation.navigate("Index Expense Page")}
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


  