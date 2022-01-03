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

const ShowCashPage = ({ navigation, route }) => {
  // useContext
  const { cashContext, expenseForceRenderContext , cashEntryContext } = useContext(DataContext);
  const [allCash] = cashContext;
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext
  const [dateCash,setDateCash,amountCash,setAmountCash,categoryCash,setCategoryCash,descriptionCash,setDescriptionCash] = cashEntryContext

  const {entry} = route.params;

  // format date to "YYYY-MM-DD"
  const actualDate = entry.cashentry.date
  const formattedDate = moment(actualDate, moment.ISO_8601).format('YYYY-MM-DD')
  
  // route DELETE
  const deleteCash = async (id) => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/cash/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status !== 200) {
      console.error("failed to delete cash");
      return;
    }

    //reloadExpense();
    setExpenseForceRender(!expenseForceRender)
    navigation.navigate("Index Cash Page");
  };

  //need this to populate editexpensepage with specified fields
  const editHandler=()=>{
    setAmountCash(entry.cashentry.amount)
    setDescriptionCash(entry.cashentry.description)
    setDateCash(entry.cashentry.date)
    setCategoryCash(entry.cashentry.category)
    navigation.navigate("Edit Cash Page", {entry: entry})
  }



  return (
    <SafeAreaView style={styles.container}>
      
      <View >
   
        <Text style={styles.wrapper}>Date: {formattedDate}</Text>
        <Text style={styles.wrapper}>Amount: $ {entry.cashentry.amount}</Text>
        <Text style={styles.wrapper}>Category: {entry.cashentry.category}</Text>
        <Text style={styles.wrapper}>Description: {entry.cashentry.description}</Text>
        <View style={styles.button}>
          <Button title="Delete" onPress={() => deleteCash(entry._id)} />
          <Button
            title="Edit"
            onPress={editHandler}
          />
          <Button
            title="Back"
            onPress={() => {navigation.navigate("Index Cash Page")
            setExpenseForceRender(!expenseForceRender)}}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default ShowCashPage;

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


  