import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Screens/login"
import Loading from "../components/Screens/loading";
import Signup from "../components/Screens/signup";
import DrawerComponent from "./DrawerNavigator";
import DataContext from "../context/DataContext";

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
    </Stack.Navigator>
  );
}
