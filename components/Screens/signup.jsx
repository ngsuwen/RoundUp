import React, { useState } from "react";
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

export default function LoginPage({ navigation }) {
  // useState
  const [isSignUpValid, setIsSignUpValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);
  const [show2, setShow2] = useState(false);
  const passwordHandler2 = () => setShow2(!show2);

  // check signup
    async function signUpHandler() {
    //   const checkUserAuth = await loginAuth(username, password);
    //   setIsLoginValid(
    //     checkUserAuth.error
    //       ? checkUserAuth.error == "uername taken"
    //       ? "uername taken"
    //       : "passwords do not match"
    //       : "pass"
    //   );
    //   navigation.navigate(checkUserAuth.error ? "Sign Up" : "Login");
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
          </FormControl>
          <Button onPress={signUpHandler} small primary>
            <Text>Sign Up</Text>
          </Button>
          <Center>
            <Text>
              Have an account?
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text color={"cyan.600"} fontWeight={"bold"}>
                  {" "}
                  Login
                </Text>
              </Pressable>
            </Text>
          </Center>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
