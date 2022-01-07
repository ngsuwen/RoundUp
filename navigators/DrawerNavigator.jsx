import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../components/Screens/home";
import About from "../components/Screens/about";
import investmentGeneralPage from "../components/Screens/investmentGeneralPage";

import expenseGeneralPage from "../components/Screens/Expense/expenseGeneralPage";

import EntryCashPage from "../components/Screens/Cash/entryCashPage";
import IndexCashPage from "../components/Screens/Cash/indexCashPage";
import ShowCashPage from "../components/Screens/Cash/showCashPage";
import EditCashPage from "../components/Screens/Cash/editCashPage";

import EntryInvestmentPage from "../components/Screens/Investment/entryInvestmentPage";
import IndexInvestmentPage from "../components/Screens/Investment/indexInvestmentPage";
import ShowInvestmentPage from "../components/Screens/Investment/showInvestmentPage";
import EditInvestmentPage from "../components/Screens/Investment/editInvestmentPage";
import ShowTickerPage from "../components/Screens/Investment/showTickerPage";


import Profile from "../components/Screens/profile";
import logoutApi from "../components/api/logoutApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "../context/DataContext";
import { useNavigationState } from "@react-navigation/native";
import checkTokenNavigation from "../components/api/checkTokenNavigation";



const Drawer = createDrawerNavigator();

export default function App({ navigation }) {

  try{
    useNavigationState(state => state.index);
    checkTokenNavigation()
  } catch(err){
    console.log('error')
  }

  const { userContext } = React.useContext(DataContext)
  const [user, setUser]=userContext

  async function logoutHandler() {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      await logoutApi(refreshToken);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser("");
      console.log("cleared");
      navigation.navigate("Login");
    } catch (err) {
      console.log("error");
    }
    return;
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={logoutHandler} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Expense GP" component={expenseGeneralPage} />
      <Drawer.Screen name="Investment GP" component={investmentGeneralPage} />

      <Drawer.Screen name="Entry Cash Page" component={EntryCashPage} /> 
      <Drawer.Screen name="Index Cash Page" component={IndexCashPage} />
      <Drawer.Screen name="Show Cash Page" component={ShowCashPage} 
        options={{drawerItemStyle: {height: 0}}}/> 
      <Drawer.Screen name="Edit Cash Page" component={EditCashPage}
        options={{drawerItemStyle: {height: 0}}} />

      <Drawer.Screen name="Entry Investment Page" component={EntryInvestmentPage} /> 
      <Drawer.Screen name="Index Investment Page" component={IndexInvestmentPage} />
      <Drawer.Screen name="Show Investment Page" component={ShowInvestmentPage} 
        options={{drawerItemStyle: {height: 0}}}/> 
      <Drawer.Screen name="Edit Investment Page" component={EditInvestmentPage}
        options={{drawerItemStyle: {height: 0}}} />
      {/* <Drawer.Screen name="Show Ticker Page" component={ShowTickerPage}/> */}
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}