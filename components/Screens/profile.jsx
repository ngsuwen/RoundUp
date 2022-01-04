import React, { useContext, useState } from "react";
import {
  FormControl,
  Stack,
  Input,
  Center,
  NativeBaseProvider,
  Button,
  Text,
  Pressable,
  Icon,
  KeyboardAvoidingView,
} from "native-base";
import { Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import DataContext from "../../context/DataContext";
import getUser from "../api/getUser";
import updateUser from "../api/updateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deleteUser from "../api/deleteUser";
import logoutApi from "../api/logoutApi";

export default function LoginPage({ navigation }) {
  // useContext UserContext
  const { userContext } = useContext(DataContext);
  const [user, setUser] = userContext;

  // useState
  const [isUpdateValid, setIsUpdateValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [referral, setReferral] = useState("");
  const [username, setUsername] = useState("");

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);
  const [show2, setShow2] = useState(false);
  const passwordHandler2 = () => setShow2(!show2);

  // check signup
  async function updateHandler() {
    try {
      const checkUpdate = await updateUser(user, password, password2, referral);
      setIsUpdateValid(checkUpdate.error ? "password" : "pass");
      // go back profile page if got error
      if (checkUpdate.error) {
        navigation.navigate("Profile");
        return;
      }
      // go to home page if successful
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      setIsUpdateValid("error");
      // go back profile page if unexpected error
      navigation.navigate("Profile");
    }
  }

  // delete user
  async function deleteUserApi() {
    try {
      const removeUser = await deleteUser(user, password);
      setIsUpdateValid(removeUser.error ? "password" : "pass");
      // go back profile page if got error
      if (removeUser.error) {
        navigation.navigate("Profile");
        return;
      }
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      await logoutApi(refreshToken);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setUser("");
      console.log("deleted");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteHandler() {
    Alert.alert("", "Are you sure? Deleted accounts cannot be recovered.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: deleteUserApi },
    ]);
  }

  // getUser
  async function getUserInfo() {
    try {
      const data = await getUser(user);
      setUsername(data.username);
    } catch (err) {
      console.log("error", err);
    }
  }

  getUserInfo();

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center flex={1} px="3" bg="#fff">
          <Stack
            space={2}
            w={{
              base: "75%",
              md: "25%",
            }}
          >
            <Center>
              <Text fontSize={"xl"}>{username}</Text>
              <Text mb={"1%"} color={"red.600"}>
                {isUpdateValid == "pass"
                  ? ""
                  : isUpdateValid == "password"
                  ? "Incorrect password"
                  : "Error. Please try again."}
              </Text>
            </Center>
            <FormControl>
              <Input
                type={show ? "text" : "password"}
                size="md"
                onChangeText={(text) => setPassword(text)}
                InputRightElement={
                  <Pressable onPress={passwordHandler}>
                    <Icon
                      as={Entypo}
                      name={show ? "eye" : "eye-with-line"}
                      color="coolGray.600"
                      size={5}
                      marginRight={3}
                    />
                  </Pressable>
                }
                placeholder="old password"
              />
              <Input
                type={show2 ? "text" : "password"}
                size="md"
                onChangeText={(text) => setPassword2(text)}
                InputRightElement={
                  <Pressable onPress={passwordHandler2}>
                    <Icon
                      as={Entypo}
                      name={show2 ? "eye" : "eye-with-line"}
                      color="coolGray.600"
                      size={5}
                      marginRight={3}
                    />
                  </Pressable>
                }
                placeholder="new password (optional)"
              />
              <Input
                size="md"
                placeholder="referral (optional)"
                onChangeText={(text) => setReferral(text)}
              />
            </FormControl>
            <Button onPress={updateHandler} colorScheme="primary">
              <Text>Update Profile</Text>
            </Button>
            <Button onPress={deleteHandler} colorScheme="danger">
              <Text>Delete Profile</Text>
            </Button>
          </Stack>
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
