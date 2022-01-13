import React, { useContext, useState, useEffect } from "react";
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
  KeyboardAvoidingView,
  Icon,
} from "native-base";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import signUpApi from "../api/signUpApi";
import loginAuth from "../api/loginAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "../../context/DataContext";
import getUserId from "../api/getUserId";
import getUser from "../api/getUser";

export default function LoginPage({ navigation }) {
  // useContext
  const { userContext, userRoleContext, tokenContext } = useContext(DataContext);
  const [user, setUser] = userContext;
  const [userRole, setUserRole] = userRoleContext;
  const [token, setToken] = tokenContext;

  console.log(user);

  // useState
  const [isSignUpValid, setIsSignUpValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [referral, setReferral] = useState("");
  const [clicked, setClicked] = useState(false);

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);
  const [show2, setShow2] = useState(false);
  const passwordHandler2 = () => setShow2(!show2);

  useEffect(() => {
    setClicked(false);
  }, [isSignUpValid]);

  // check signup
  async function signUpHandler() {
    setClicked(true);
    try {
      const checkSignUp = await signUpApi(
        username,
        password,
        password2,
        referral
      );
      
      checkSignUp.error
        ? setIsSignUpValid(
          checkSignUp.error == "incorrect password"
          ? "passwords do not match"
          : "username taken")
        : "";

      // go back sign up page if got error
      if (checkSignUp.error) {
        navigation.navigate("Sign Up");
        return;
      }
      //try to login if signup is successful
      try {
        const checkUserAuth = await loginAuth(username, password);
        // store tokens in FE
        await AsyncStorage.setItem("accessToken", checkUserAuth.accessToken);
        await AsyncStorage.setItem("refreshToken", checkUserAuth.refreshToken);
        setToken(checkUserAuth.refreshToken);
        const userId = await getUserId(checkUserAuth.refreshToken);
        setUser(userId);
        const userInfo = await getUser(userId)
        setUserRole(userInfo.role)
        console.log(userId);
        setIsSignUpValid("pass")
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
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center bgColor="#fff" flex={1} px="3">
          <Stack
            space={2}
            w={{
              base: "75%",
              md: "25%",
            }}
          >
            <Center>
              <Image source={require("../../assets/rounduplogo.png")} style={{height:128,width:128}} />
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
            <Button
              onPress={signUpHandler}
              small
              primary
              isLoading={clicked ? true : false}
            >
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
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
