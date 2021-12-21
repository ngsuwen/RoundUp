// TO FIX //
// have to fix back button going back to login page 

import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Screens/login";
import Signup from "./components/Screens/signup";
import DrawerComponent from "./components/drawer";

const Stack = createNativeStackNavigator();

function App() {
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
      <Stack.Navigator
        initialRouteName="Drawer"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen name="Drawer" component={DrawerComponent}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
