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

const IndexExpensePage = ({ navigation }) => {
  // useContext
  const { expenseContext  } = useContext(DataContext);
  const [allExpense, reloadExpense, totalExpense] = expenseContext;
  

  


  useEffect(() => {
    reloadExpense();
  }, [allExpense]);  

  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
            {/* <Text>Total Expense: {totalExpense}</Text> */}
          {allExpense.map((ele, i) => {
            return (
              
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate("Show Expense Page", {ele})}
              >
              
                <View style={styles.entry}>
                  
                  <Text>Id: {ele._id}</Text>
                  <Text>Username: {ele.username}</Text>
                  <Text>Date: {ele.expensesentry.date}</Text>
                  <Text>Amount: $ {ele.expensesentry.amount}</Text>
                  <Text>Category: {ele.expensesentry.category}</Text>
                  <Text>Description: {ele.expensesentry.description}</Text>
                </View>
              </TouchableOpacity>
             
     
            );
          })}
        </View>
        <Button
                  title="Back"
                  onPress={() => navigation.navigate("Home")}
                />
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexExpensePage;

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
  entry:{
    paddingBottom: 10,
    paddingTop: 10
  }
});
