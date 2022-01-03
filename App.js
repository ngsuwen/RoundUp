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
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState("Shopping");
  const [description, setDescription] = useState("");

  // useState for cash
  const [allCash, setAllCash] = useState([]);
  const [dateCash, setDateCash] = useState(new Date());
  const [amountCash, setAmountCash] = useState([]);
  const [categoryCash, setCategoryCash] = useState("Income");
  const [descriptionCash, setDescriptionCash] = useState("");

  // useState for expense month selector (KSZ)
  const [expenseMonth, setExpenseMonth] = useState(moment().format("YYYY-MM"));

  // useState for expense fetched entries (month) (KSZ)
  const [fetchedExpenseEntries, setFetchedExpenseEntries] = useState([]);

  // useState for investment
  const [fetchedInvestmentEntries, setInvestmentEntries] = useState([]);
  const [tickerAndPrice,setTickerAndPrice] = useState([])
  // forcerender for update routes
  const [expenseForceRender, setExpenseForceRender] = useState(false);
  const [investmentgpForceRender,setInvestmentgpForceRender] = useState(false)

  // check storage for tokens upon opening app
  useEffect(async () => {
    try {
      // get tokens from local storage
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      // check if token is valid
      const isTokenValid = await checkToken(accessToken, refreshToken);
      console.log("checktokenpage triggered");
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
      console.log(userId);
      console.log(accessToken, isTokenValid.accessToken);
      console.log(refreshToken, isTokenValid.refreshToken);
    } catch (err) {
      setUser("");
      console.log("App useEffect checkToken error");
    }
  }, []);

  // route GET expense data for index page only // need this to render at UI side
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

  // route GET cash data for index page only // need this to render at UI side
  const reloadCash = async () => {
    const res = await fetch(`https://roundup-api.herokuapp.com/data/cash/`);
    if (res.status !== 200) {
      console.error("failed to fetch cash data");
      setAllCash([]);
      return;
    }
    const data = await res.json();
    setAllCash(data);
  };

  useEffect(()=>{
    reloadCash()
  }, [allCash])

  return (
    <NavigationContainer>
      <DataContext.Provider
        value={{
          monthContext: [expenseMonth, setExpenseMonth],
          expenseMonthContext: [
            fetchedExpenseEntries,
            setFetchedExpenseEntries,
          ],
          expenseForceRenderContext: [
            expenseForceRender,
            setExpenseForceRender,
          ],
          expenseEntryContext: [
            date,
            setDate,
            amount,
            setAmount,
            category,
            setCategory,
            description,
            setDescription,
          ],
          expenseContext: [allExpense, reloadExpense],
          cashEntryContext:[
            dateCash,
            setDateCash,
            amountCash,
            setAmountCash,
            categoryCash,
            setCategoryCash,
            descriptionCash,
            setDescriptionCash,
          ],
          cashContext: [allCash],
          userContext: [user, setUser],
          investmentContext: [fetchedInvestmentEntries, setInvestmentEntries],
          tickerAndPriceContext: [tickerAndPrice,setTickerAndPrice],
          investmentGPContext: [investmentgpForceRender,setInvestmentgpForceRender],
        }}
      >
        <StackNavigator />
      </DataContext.Provider>
    </NavigationContainer>
  );
}

export default App;
