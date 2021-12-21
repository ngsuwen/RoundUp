// TO FIX //
// have to fix back button going back to login page

import React, { createContext, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Screens/login";
import Signup from "./components/Screens/signup";
import DrawerComponent from "./components/drawer";

const Stack = createNativeStackNavigator();

// userContext
export const TokenContext = createContext();

function App() {
  // user state, to be provided at all pages to check for session
  const [tokenData, setTokenData] = useState({
    accessToken: "",
    refreshToken: "",
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <NavigationContainer>
      <TokenContext.Provider value={[tokenData, setTokenData]}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Drawer" component={DrawerComponent} />
        </Stack.Navigator>
      </TokenContext.Provider>
    </NavigationContainer>
  );
}

export default App;
