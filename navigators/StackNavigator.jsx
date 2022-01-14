import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataContext from "../context/DataContext";
// import pages
import Login from "../components/Screens/login";
import Loading from "../components/Screens/loading";
import Signup from "../components/Screens/signup";
import EntryExpensePage from "../components/Screens/Expense/entryExpensePage";
import ShowExpensePage from "../components/Screens/Expense/showExpensePage";
import EditExpensePage from "../components/Screens/Expense/editExpensePage";
import EntryCashPage from "../components/Screens/Cash/entryCashPage";
import ShowCashPage from "../components/Screens/Cash/showCashPage";
import EditCashPage from "../components/Screens/Cash/editCashPage";
import EntryInvestmentPage from "../components/Screens/Investment/entryInvestmentPage";
import ShowInvestmentPage from "../components/Screens/Investment/showInvestmentPage";
import EditInvestmentPage from "../components/Screens/Investment/editInvestmentPage";
import DrawerComponent from "./DrawerNavigator";
import ShowTickerPage from "../components/Screens/Investment/showTickerPage"

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  // useContext
  const { userContext } = React.useContext(DataContext);
  const [user, setUser] = userContext;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      // initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* if user is logged in, load drawer instead */}
      <Stack.Screen
        name="Login"
        component={user === "" ? Login : user ? DrawerComponent : Loading}
      />
      <Stack.Screen name="Sign Up" component={Signup} />
      <Stack.Screen name="Drawer" component={DrawerComponent} />

      <Stack.Screen name="Add Money Out" component={EntryExpensePage} />
      <Stack.Screen name="Show Expense Page" component={ShowExpensePage} />
      <Stack.Screen name="Edit Expense Page" component={EditExpensePage} />

      <Stack.Screen name="Add Money In" component={EntryCashPage} />
      <Stack.Screen name="Show Cash Page" component={ShowCashPage} />
      <Stack.Screen name="Edit Cash Page" component={EditCashPage} />

      <Stack.Screen name="Entry Investment Page" component={EntryInvestmentPage} /> 
      <Stack.Screen name="Show Investment Page" component={ShowInvestmentPage} /> 
      <Stack.Screen name="Edit Investment Page" component={EditInvestmentPage} />
    </Stack.Navigator>
  );
}
