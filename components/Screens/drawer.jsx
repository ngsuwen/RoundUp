import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "./home";
import About from "./about";
import Generalpage from "./generalPage";
import EntryExpensePage from "./entryExpensePage";
import IndexExpensePage from "./indexExpensePage";
import ShowExpensePage from "./showExpensePage";
import EditExpensePage from "./editExpensePage";
import Profile from "./profile";
import logoutApi from "../api/logoutApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../App";
import { useNavigationState } from "@react-navigation/native";
import checkTokenNavigation from "../api/checkTokenNavigation";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  useNavigationState(state => state.index);
  checkTokenNavigation()

  const [user, setUser] = React.useContext(UserContext);

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
      <Drawer.Screen name="General Page" component={Generalpage} />
      <Drawer.Screen name="Entry Expense Page" component={EntryExpensePage} />
      <Drawer.Screen name="Index Expense Page" component={IndexExpensePage} />
      <Drawer.Screen name="Show Expense Page" component={ShowExpensePage} />
      <Drawer.Screen name="Edit Expense Page" component={EditExpensePage} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
