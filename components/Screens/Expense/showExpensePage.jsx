import React, { useState, useEffect } from "react";
import moment from 'moment';
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
  FlatList
} from "react-native";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";

const ShowExpensePage = ({ navigation, route }) => {
  // useContext
  const { expenseContext, expenseForceRenderContext , expenseEntryContext } = useContext(DataContext);
  const [allExpense, reloadExpense] = expenseContext;
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext
  const [date,setDate,amount,setAmount,selectedValue,setSelectedValue,description,setDescription] = expenseEntryContext

  const {entry} = route.params;

  // format date to "YYYY-MM-DD"
  const actualDate = entry.expensesentry.date
  const formattedDate = moment(actualDate, moment.ISO_8601).format('YYYY-MM-DD')
  
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

    //reloadExpense();
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
      
      <View >
   
        <Text style={styles.wrapper}>Date: {formattedDate}</Text>
        <Text style={styles.wrapper}>Amount: $ {entry.expensesentry.amount}</Text>
        <Text style={styles.wrapper}>Category: {entry.expensesentry.category}</Text>
        <Text style={styles.wrapper}>Description: {entry.expensesentry.description}</Text>
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

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d5f4e6",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  button:{
    flexDirection: "row",
    alignSelf: "center"  
  },
  wrapper: {
    
    fontSize: 20,
    flex: 0.2,
    textAlign: "center",
    flexDirection:'column',
    width: screenWidth*0.9,
    backgroundColor: '#fefbd8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingTop: 35,
    margin: '2%',
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: .22,
    elevation: 3,
    },
});


  