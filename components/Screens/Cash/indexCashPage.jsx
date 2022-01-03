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
import DataContext from "../../../context/DataContext";

const IndexCashPage = ({ navigation }) => {
  // useContext
  const { cashContext  } = useContext(DataContext);
  const [allCash] = cashContext;
  

  

// might cause looping
  // useEffect(() => {
  //   reloadExpense();
  // }, [allExpense]);  

  


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
            
          {allCash.map((entry, i) => {
            return (
              
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate("Show Cash Page", {entry})}
              >
              
                <View style={styles.entry}>
                  
                  <Text>Id: {entry._id}</Text>
                  <Text>Username: {entry.username}</Text>
                  <Text>Date: {entry.cashentry.date}</Text>
                  <Text>Amount: $ {entry.cashentry.amount}</Text>
                  <Text>Category: {entry.cashentry.category}</Text>
                  <Text>Description: {entry.cashentry.description}</Text>
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

export default IndexCashPage;

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
