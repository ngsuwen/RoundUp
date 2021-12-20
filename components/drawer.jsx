import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./home";
import About from "./about";
import Generalpage from "./generalPage";
import Login from "./Screens/login"

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        headerShown:true, 
        headerStyle:{
          backgroundColor:'white',
          elevation:0,
          shadowOpacity:0
        },
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="General Page" component={Generalpage} />
      </Drawer.Navigator>
  );
}
