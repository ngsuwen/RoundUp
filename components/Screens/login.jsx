import React, { useState, useContext } from "react";
import {
  FormControl,
  Stack,
  Input,
  Heading,
  Center,
  NativeBaseProvider,
  Button,
  Text,
  Pressable,
  Icon,
} from "native-base";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import loginAuth from "../Sessions/loginAuth";
import { TokenContext } from "../../App";
import * as SecureStore from 'expo-secure-store';

export default function LoginPage({ navigation }) {
  // useState
  const [isLoginValid, setIsLoginValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // useContext
  const [tokenData, setTokenData] = useContext(TokenContext)

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);

  //check login
  async function loginHandler() {
    const checkUserAuth = await loginAuth(username, password);
    setIsLoginValid(
      checkUserAuth.error
        ? checkUserAuth.error == "invalid user"
        ? "invalid user"
        : "invalid password"
        : "pass"
    );
    try {
      // store tokens in FE
      await SecureStore.setItemAsync('accessToken',checkUserAuth.accessToken);
      await SecureStore.setItemAsync('refreshToken',checkUserAuth.refreshToken);
      setTokenData({accessToken:checkUserAuth.accessToken, refreshToken:checkUserAuth.refreshToken})
      navigation.navigate("Drawer");
    } catch(err) {
      console.log(err)
      navigation.navigate("Login");
    }
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Stack
          space={2}
          w={{
            base: "75%",
            md: "25%",
          }}
        >
          <Center>
            <Image source={require("../../assets/rounduplogo.png")} />
            <Heading mb="5">Round Up</Heading>
            <Text color={"red.600"}>
              {isLoginValid == "pass"
                ? ""
                : isLoginValid == "invalid user"
                ? "invalid user"
                : "invalid password"}
            </Text>
          </Center>
          <FormControl isRequired>
            <Input
              size="md"
              placeholder="username or email"
              onChangeText={(text) => setUsername(text)}
            />
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
              placeholder="password"
            />
          </FormControl>
          <Button onPress={loginHandler} small primary>
            <Text>Log In</Text>
          </Button>
          <Center>
            <Text>
              Don't have an account?
              <Pressable onPress={() => navigation.navigate("Sign Up")}>
                <Text color={"cyan.600"} fontWeight={"bold"}>
                  {" "}
                  Sign up
                </Text>
              </Pressable>
            </Text>
          </Center>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
