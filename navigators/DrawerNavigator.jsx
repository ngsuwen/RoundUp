import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../components/Screens/home";
import About from "../components/Screens/about";
import Generalpage from "../components/Screens/generalPage";
import EntryExpensePage from "../components/Screens/entryExpensePage";
import IndexExpensePage from "../components/Screens/indexExpensePage";
import ShowExpensePage from "../components/Screens/showExpensePage";
import EditExpensePage from "../components/Screens/editExpensePage";
import Profile from "../components/Screens/profile";
import logoutApi from "../components/api/logoutApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "../context/DataContext";
import { useNavigationState } from "@react-navigation/native";
import checkTokenNavigation from "../components/api/checkTokenNavigation";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  useNavigationState(state => state.index);
  checkTokenNavigation()

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
      <Drawer.Screen name="General Page" component={Generalpage} />
      <Drawer.Screen name="Entry Expense Page" component={EntryExpensePage} />
      <Drawer.Screen name="Index Expense Page" component={IndexExpensePage} />
      <Drawer.Screen name="Show Expense Page" component={ShowExpensePage} />
      <Drawer.Screen name="Edit Expense Page" component={EditExpensePage} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}