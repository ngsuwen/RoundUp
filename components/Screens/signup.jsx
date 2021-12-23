import React, { useContext, useState } from "react";
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
import signUpApi from "../api/signUpApi";
import loginAuth from "../api/loginAuth";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../../App";
import getUserId from "../api/getUserId";

export default function LoginPage({ navigation }) {
  // useContext UserContext
  const [user, setUser]=useContext(UserContext)

  // useState
  const [isSignUpValid, setIsSignUpValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);
  const [show2, setShow2] = useState(false);
  const passwordHandler2 = () => setShow2(!show2);

  // check signup
  async function signUpHandler() {
    try {
      const checkSignUp = await signUpApi(
        username,
        password,
        password2,
        referral
      );
      setIsSignUpValid(
        checkSignUp.error
          ? checkSignUp.error == "incorrect password"
            ? "passwords do not match"
            : "username taken"
          : "pass"
      );
      // go back sign up page if got error
      if (checkSignUp.error) {
        navigation.navigate("Sign Up");
        return;
      }
      //try to login if signup is successful
      try {
        const checkUserAuth = await loginAuth(username, password);
        // store tokens in FE
        await SecureStore.setItemAsync(
          "accessToken",
          checkUserAuth.accessToken
        );
        await SecureStore.setItemAsync(
          "refreshToken",
          checkUserAuth.refreshToken
        );
        const userId = await getUserId(checkUserAuth.refreshToken)
        setUser(userId);
        console.log(userId)
        // load drawer if login successful
        navigation.navigate("Drawer");
      } catch (err) {
        console.log(err);
        // load login page if login unsuccessful
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
      // go back sign up page if unexpected error
      navigation.navigate("Sign Up");
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
              {isSignUpValid == "pass"
                ? ""
                : isSignUpValid == "username taken"
                ? "username taken"
                : "passwords do not match"}
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
              placeholder="repeat password"
            />
            <Input
              size="md"
              placeholder="referral (optional)"
              onChangeText={(text) => setReferral(text)}
            />
          </FormControl>
          <Button onPress={signUpHandler} small primary>
            <Text>Sign Up</Text>
          </Button>
          <Center>
            <Text>
              Have an account?{" "}
              <Text
                color={"cyan.600"}
                fontWeight={"bold"}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </Text>
          </Center>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
