import * as React from "react";
import checkToken from "./checkToken";
import DataContext from "../../context/DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function checkTokenNavigation() {
  const { userContext } = React.useContext(DataContext)
  const [user, setUser]=userContext

  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const isTokenValid = await checkToken(accessToken, refreshToken);
    if (isTokenValid.error) {
      console.log('token check failed, bringing back to login')
      await logoutApi(refreshToken);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser("");
      navigation.navigate("Login");
    } else {
      await AsyncStorage.setItem("accessToken", isTokenValid.accessToken);
      await AsyncStorage.setItem("refreshToken", isTokenValid.refreshToken);
    }
    console.log('token check pass')
  } catch (err) {
    console.log('token check fail, bringing back to login')
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setUser("");
    navigation.navigate("Login");
  }
}
