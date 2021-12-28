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
        <View>
          <Button title="Delete" onPress={() => deleteExpense(ele._id)} />
          <Button
            title="Edit"
            onPress={() => navigation.navigate("Edit Expense Page", {ele})}
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
});


  // useEffect(() => {
  //   reloadExpense();
  // }, [expense]); 



  //const [singleExpense, setSingleExpense] = useState(expense)

  //  useEffect(() => {
  //   if (!singleExpense) {
  //     return
  //   }
  //   const updated = allExpenses.find((_expense) => _expense._id === singleExpense._id)
  //   if (updated) {
  //     setSingleExpense(updated)

  //   } else {
  //     setSingleExpense(null)
  //   }

  // }, [allExpenses])

  // // route GET edit expense data // need this to render at UI side
  // const reloadSingleExpense = async (expense) => {
  //   const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/${expense._id}/edit`)
  //   if (res.status !== 200) {
  //     console.error('failed to fetch expense data')
  //     setSingleExpense([])
  //     return
  //   }
  //   const data = await res.json();
  //   setSingleExpense(data)
  //   console.log("singleExpense", singleExpense)
  // }

  // useEffect(() => {
  //   // setSingleExpense(expense)
  //   reloadSingleExpense(expense)
  // }, [])