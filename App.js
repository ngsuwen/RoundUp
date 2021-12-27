// TO FIX //
// have to fix back button going back to login page

import React, { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Screens/login";
import Loading from "./components/Screens/loading";
import Signup from "./components/Screens/signup";
import DrawerComponent from "./components/Screens/drawer";
import checkToken from "./components/api/checkToken";
import getUserId from "./components/api/getUserId";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

// userContext
export const UserContext = createContext();

// entryContext
export const EntryContext = createContext();

function App() {
  // token state, to be provided at all pages to check for session
  const [user, setUser] = useState(null);

  // useState for expense
  const [allExpense, setAllExpense] = useState()
  // const [date, setDate] = useState(new Date())
  //  const [amount, setAmount] = useState();
  //  const [selectedValue, setSelectedValue] = useState("Shopping")
  //  const [description, setDescription] = useState("");

  // check storage for tokens upon opening app
  useEffect(async () => {
    try {
      // get tokens from local storage
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      // check if token is valid
      const isTokenValid = await checkToken(accessToken, refreshToken);
      const userId = isTokenValid.error?'':await getUserId(isTokenValid.refreshToken)
      setUser(userId)
      isTokenValid.error?'':await AsyncStorage.setItem("accessToken", isTokenValid.accessToken);
      isTokenValid.error?'':await AsyncStorage.setItem("refreshToken", isTokenValid.refreshToken);
      console.log(userId, "tokens checked");
    } catch (err) {
      console.log("error");
    }
  }, []);


    // route GET expense data // need this to render at UI side
    const reloadExpense = async () => {
      const res = await fetch(`https://roundup-api.herokuapp.com/data/expense/`)
      if (res.status !== 200) {
        console.error('failed to fetch expense data')
        setAllExpense([])
        return
      }
      const data = await res.json();
      setAllExpense(data)
    }

    useEffect(() => {
      reloadExpense()
      
    }, [])




  return (
    <NavigationContainer>
      <UserContext.Provider value={[user, setUser]}>
      <EntryContext.Provider value={[allExpense, reloadExpense]}>
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
            component={
              user === ""
                ? Login
                : user
                ? DrawerComponent
                : Loading
            }
          />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Drawer" component={DrawerComponent} />
          
        </Stack.Navigator>
        </EntryContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export default App;
