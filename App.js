// TO FIX //
// have to fix back button going back to login page

import React, { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Screens/login";
import Loading from "./components/Screens/loading";
import Signup from "./components/Screens/signup";
import ShowPage from "./components/Screens/showPage"
import DrawerComponent from "./components/Screens/drawer";
import checkToken from "./components/Sessions/checkToken";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

// tokenContext test
export const TokenContext = createContext();

function App() {
  // token state, to be provided at all pages to check for session
  const [tokenData, setTokenData] = useState({
    accessToken: null,
    refreshToken: null,
  });

  // check storage for tokens upon opening app
  useEffect(async () => {
    try {
      // get tokens from local storage
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      // check if token is valid
      const isTokenValid = await checkToken(accessToken, refreshToken);
      isTokenValid.error
        ? setTokenData({
            accessToken: "",
            refreshToken: "",
          })
        : setTokenData({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
      console.log("tokens checked");
    } catch (err) {
      console.log("error");
    }
  }, []);

  return (
    <NavigationContainer>
      <TokenContext.Provider value={[tokenData, setTokenData]}>
        <Stack.Navigator
          // initialRouteName="Login"
          initialRouteName="Drawer"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* if user is logged in, load drawer instead */}
          <Stack.Screen
            name="Login"
            component={
              tokenData.accessToken === ""
                ? Login
                : tokenData.accessToken
                ? DrawerComponent
                : Loading
            }
          />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Drawer" component={DrawerComponent} />
          <Stack.Screen name="Show Page" component={ShowPage}/>
        </Stack.Navigator>
      </TokenContext.Provider>
    </NavigationContainer>
  );
}

export default App;
