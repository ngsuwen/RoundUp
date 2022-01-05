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

const ShowInvestmentPage = ({ navigation, route }) => {
  // useContext
  const { expenseForceRenderContext , investmentEntryContext } = useContext(DataContext);
  const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext
  const [dateInvestment,setDateInvestment,
         priceInvestment,setPriceInvestment,
         categoryInvestment,setCategoryInvestment,
         tickerInvestment,setTickerInvestment, 
         qtyInvestment, setQtyInvestment,
        transaction, setTransaction] = investmentEntryContext

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

    setExpenseForceRender(!expenseForceRender)
    navigation.navigate("Index Investment Page");
  };

  //need this to populate editpage with specified fields
  const editHandler=()=>{
    setPriceInvestment(entry.investmentsentry.price)
    setTickerInvestment(entry.investmentsentry.ticker)
    setDateInvestment(entry.investmentsentry.date)
    setQtyInvestment(entry.investmentsentry.quantity)
    setCategoryInvestment(entry.investmentsentry.category)
    setTransaction(entry.investmentsentry.transaction)
    navigation.navigate("Edit Investment Page", {entry: entry})
  }



  return (
    <SafeAreaView style={styles.container}>
      
      <View >
   
        <Text style={styles.wrapper}>Date: {formattedDate}</Text>
        <Text style={styles.wrapper}>Price: $ {entry.investmentsentry.price}</Text>
        <Text style={styles.wrapper}>Quantity: {entry.investmentsentry.quantity}</Text>
        <Text style={styles.wrapper}>Category: {entry.investmentsentry.category}</Text>
        <Text style={styles.wrapper}>Ticker: {entry.investmentsentry.ticker}</Text>
        <Text style={styles.wrapper}>Transaction: {entry.investmentsentry.transaction}</Text>
        <View style={styles.button}>
          <Button title="Delete" onPress={() => deleteInvestment(entry._id)} />
          <Button
            title="Edit"
            onPress={editHandler}
          />
          <Button
            title="Back"
            onPress={() => {navigation.navigate("Index Investment Page")
            setExpenseForceRender(!expenseForceRender)}}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

export default ShowInvestmentPage;

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


  