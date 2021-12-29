import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import checkToken from "./components/api/checkToken";
import getUserId from "./components/api/getUserId";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import DataContext from "./context/DataContext";
import StackNavigator from "./navigators/StackNavigator";

function App() {
  // token state, to be provided at all pages to check for session
  const [user, setUser] = useState(null);

  // useState for expense
  const [allExpense, setAllExpense] = useState([]);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [selectedValue, setSelectedValue] = useState("Shopping");
  const [description, setDescription] = useState("");

  // useState for expense month selector (KSZ)
  const [expenseMonth, setExpenseMonth] = useState(moment().format("YYYY-MM"));

  // useState for expense fetched entries (month) (KSZ)
  const [fetchedExpenseEntries, setFetchedExpenseEntries] = useState([]);

  // check storage for tokens upon opening app
  useEffect(async () => {
    try {
      // get tokens from local storage
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      // check if token is valid
      const isTokenValid = await checkToken(accessToken, refreshToken);
      const userId = isTokenValid.error
        ? ""
        : await getUserId(isTokenValid.refreshToken);
      setUser(userId);
      isTokenValid.error
        ? ""
        : await AsyncStorage.setItem("accessToken", isTokenValid.accessToken);
      isTokenValid.error
        ? ""
        : await AsyncStorage.setItem("refreshToken", isTokenValid.refreshToken);
      console.log(userId, "tokens checked");
    } catch (err) {
      console.log("error");
    }
  }, []);

  // route GET expense data // need this to render at UI side
  const reloadExpense = async () => {
    const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/`);
    if (res.status !== 200) {
      console.error("failed to fetch expense data");
      setAllExpense([]);
      return;
    }
    const data = await res.json();
    setAllExpense(data);
  };

  // useEffect(() => {
  //   reloadExpense();
  // }, []);

  // Date Picker
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <NavigationContainer>
      <DataContext.Provider
        value={{
          monthContext: [expenseMonth, setExpenseMonth],
          expenseMonthContext: [
            fetchedExpenseEntries,
            setFetchedExpenseEntries,
          ],
          expenseEntryContext: [
            date,
            setDate,
            onChangeDate,
            amount,
            setAmount,
            selectedValue,
            setSelectedValue,
            description,
            setDescription,
          ],
          userContext: [user, setUser],
          expenseContext: [allExpense, reloadExpense],
        }}
      >
        <StackNavigator />
      </DataContext.Provider>
    </NavigationContainer>
  );
}

export default App;
