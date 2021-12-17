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
import loginAuth from "./loginAuth";

export default function LoginPage({ navigation }) {
  // useState
  const [isLoginValid, setIsLoginValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
    navigation.navigate(checkUserAuth.error ? "Login" : "Home");
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
          {/* Link to be updated */}
          <Button onPress={loginHandler} small primary>
            <Text>Log In</Text>
          </Button>
          <Center>
            <Text>
              Don't have an account?
              {/* Link to be updated */}
              <Pressable onPress={() => navigation.navigate("Home")}>
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
