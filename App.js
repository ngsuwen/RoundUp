import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import checkToken from "./components/api/checkToken";
import getUserId from "./components/api/getUserId";
import getUser from "./components/api/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import DataContext from "./context/DataContext";
import StackNavigator from "./navigators/StackNavigator";

function App() {
  // token state, to be provided at all pages to check for session
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null)

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

  // useState for investment
  const [allInvestment, setAllInvestment] = useState([]);
  const [dateInvestment, setDateInvestment] = useState(new Date());
  const [priceInvestment, setPriceInvestment] = useState([]);
  const [categoryInvestment, setCategoryInvestment] = useState("Crypto");
  const [tickerInvestment, setTickerInvestment] = useState([
    {
      id: "0xcharts",
      name: "0xCharts",
      symbol: "0xc",
    },
  ]);
  const [qtyInvestment, setQtyInvestment] = useState([]);
  const [transaction, setTransaction] = useState();
  const [coin, setCoin] = useState([])
  const [stock, setStock] = useState([])
  const [filterTextCrypto, setFilterTextCrypto] = useState("");
  const [filterTextStock, setFilterTextStock] = useState("");

  // filtered for coin
  const filteredItemsCrypto = useMemo(() => {
    return coin.filter(
      (item) => item.symbol.toLowerCase().indexOf(filterTextCrypto.toLowerCase()) > -1
    );
    
  }, [filterTextCrypto]);

  // filtered for stock
  const filteredItemsStock = useMemo(() => {
    return stock.filter(
      (item) => item.displaySymbol.toLowerCase().indexOf(filterTextStock.toLowerCase()) > -1
    );
    
  }, [filterTextStock]);

//fetch crypto for ticker
useEffect(()=>{
  const loadCoin = async() =>{
      const res  = await fetch("https://roundup-api.herokuapp.com/data/investment/crypto/all")
      if (res.status !== 200) {
        console.error("failed to fetch crypto data");
        setCoin([]);
        return;
      }
      const data = await res.json();
      //console.log(data)
      setCoin(data);
  }
  loadCoin()
  }, [])

 //fetch stock for ticker
 useEffect(()=>{
    const loadStock = async() =>{
      const res  = await fetch("https://roundup-api.herokuapp.com/data/investment/stocks/all")
      if (res.status !== 200) {
        console.error("failed to fetch stocks data");
        setStock([]);
        return;
      }
        const data = await res.json()
        const stockCompanies = data.slice(0, 1000)
        //console.log(stockCompanies)
        setStock(stockCompanies)
    }
    loadStock()
    }, [])


  // useState for month selector (KSZ)
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );

  // useState for cash fetched entries (month)
  const [fetchedCashEntries, setFetchedCashEntries] = useState([]);

  // useState for expense fetched entries (month) (KSZ)
  const [fetchedExpenseEntries, setFetchedExpenseEntries] = useState([]);

  // useState for investment
  const [fetchedInvestmentEntries, setInvestmentEntries] = useState([]);
  const [tickerAndPrice, setTickerAndPrice] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  const [selectedTickerAndPrice,setSelectedTickerAndPrice] = useState()
  const [fetchedInvestmentEntriesRawData, setFetchedInvestmentEntriesRawData] =
    useState([]);
  // forcerender for update routes
  const [expenseForceRender, setExpenseForceRender] = useState(false);
  const [investmentgpForceRender, setInvestmentgpForceRender] = useState(false);

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
      const userInfo = await getUser(userId)
      setUserRole(userInfo.role)
      isTokenValid.error
        ? ""
        : await AsyncStorage.setItem("accessToken", isTokenValid.accessToken);
      isTokenValid.error
        ? ""
        : await AsyncStorage.setItem(
            "refreshToken",
            isTokenValid.refreshToken,
            async () => {
              const newToken = await AsyncStorage.getItem("refreshToken");
              setToken(newToken);
            }
          );
      console.log(userId);
      console.log(accessToken, isTokenValid.accessToken);
      console.log(refreshToken, isTokenValid.refreshToken);
    } catch (err) {
      setUser("");
      console.log("App useEffect checkToken error");
    }
  }, []);

  // route GET expense data for index page only
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

  // route GET cash data for index page only
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

  // route GET investment data for index page only
  const reloadInvestment = async () => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/investment/`
    );
    if (res.status !== 200) {
      console.error("failed to fetch investment data");
      setAllInvestment([]);
      return;
    }
    const data = await res.json();
    setAllInvestment(data);
  };

  // useEffect only for index page. If not needed for testing, will comment out
  // useEffect(()=>{
  //   //reloadCash()
  //   reloadInvestment()
  // }, [allInvestment])

  return (
    <NavigationContainer>
      <DataContext.Provider
        value={{
          monthContext: [selectedMonth, setSelectedMonth],
          expenseMonthContext: [
            fetchedExpenseEntries,
            setFetchedExpenseEntries,
          ],
          cashMonthContext: [
            fetchedCashEntries,
            setFetchedCashEntries,
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
          expenseContext: [allExpense],
          cashEntryContext: [
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
          investmentEntryContext: [
            dateInvestment,
            setDateInvestment,
            priceInvestment,
            setPriceInvestment,
            categoryInvestment,
            setCategoryInvestment,
            tickerInvestment,
            setTickerInvestment,
            qtyInvestment,
            setQtyInvestment,
            transaction,
            setTransaction,
            coin,
            setCoin,
            stock,
            setStock,
            filterTextCrypto,
            setFilterTextCrypto,
            filterTextStock,
            setFilterTextStock,
            filteredItemsCrypto,
            filteredItemsStock,
          ],
          investmentQContext: [allInvestment],
          userContext: [user, setUser],
          tokenContext: [token, setToken],
          userRoleContext: [userRole, setUserRole],
          investmentContext: [fetchedInvestmentEntries, setInvestmentEntries],
          tickerAndPriceContext: [tickerAndPrice, setTickerAndPrice],
          investmentGPContext: [
            investmentgpForceRender,
            setInvestmentgpForceRender,
          ],
          investmentTickerContext: [tickerData, setTickerData],
          investmentContextRawData: [
            fetchedInvestmentEntriesRawData,
            setFetchedInvestmentEntriesRawData,
          ],
          selectedTickerAndPriceContext:[selectedTickerAndPrice,setSelectedTickerAndPrice],
        }}
      >
        <StackNavigator />
      </DataContext.Provider>
    </NavigationContainer>
  );
}

export default App;
