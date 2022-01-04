import * as React from "react";
import checkToken from "./checkToken";
import DataContext from "../../context/DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoutApi from "./logoutApi";

export default async function checkTokenNavigation() {
  const { userContext, tokenContext } = React.useContext(DataContext);
  const [user, setUser] = userContext;
  const [token, setToken] = tokenContext;

  if (token) {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const isTokenValid = await checkToken(accessToken, refreshToken);
      if (isTokenValid.error) {
        console.log("token check failed, bringing back to login");
        await logoutApi(refreshToken);
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        setUser("");
        navigation.navigate("Login");
      } else {
        await AsyncStorage.setItem("accessToken", isTokenValid.accessToken);
        await AsyncStorage.setItem("refreshToken", isTokenValid.refreshToken);
      }
      //console.log('token check pass')
    } catch (err) {
      console.log("unexpected error");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser("");
      //navigation.navigate("Login");
    }
  } else {
    console.log("check token null");
  }
}
