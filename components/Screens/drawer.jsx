import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./home";
import About from "./about";
import Generalpage from "./generalPage";
import Entrypage from "./entryPage"
import Profile from "./profile"
import logoutApi from "../api/logoutApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function App() {

  async function logoutHandler(){
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken')
      await logoutApi(refreshToken)
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('refreshToken')
      console.log('cleared')
    } catch (err) {
      console.log('error')
    }
    return
  }

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
        <Drawer.Screen name="Entry Page Cash" component={Entrypage} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={logoutHandler} />
      </Drawer.Navigator>
  );
}
