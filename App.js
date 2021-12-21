// TO FIX //
// have to fix back button going back to login page

import React, { createContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Screens/login";
import Signup from "./components/Screens/signup";
import DrawerComponent from "./components/drawer";
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
        ? ""
        : setTokenData({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
      console.log("tokens checked");
    } catch (err) {
      console.log("no existing token");
    }
  }, []);

  return (
    <NavigationContainer>
      <TokenContext.Provider value={[tokenData, setTokenData]}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* if user if logged in, load drawer instead */}
          <Stack.Screen
            name="Login"
            component={tokenData.accessToken ? DrawerComponent : Login}
          />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Drawer" component={DrawerComponent} />
        </Stack.Navigator>
      </TokenContext.Provider>
    </NavigationContainer>
  );
}

export default App;
