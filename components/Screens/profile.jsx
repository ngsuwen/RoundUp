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
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { UserContext } from "../../App";

export default function LoginPage({ navigation }) {
  // useContext UserContext
  const [user, setUser] = useContext(UserContext);

  // useState
  const [isUpdateValid, setIsUpdateValid] = useState("pass");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");

  // password state
  const [show, setShow] = useState(false);
  const passwordHandler = () => setShow(!show);

  // check signup
  async function updateHandler() {
    console.log("updated");
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" bg="#fff">
        <Stack
          space={2}
          w={{
            base: "75%",
            md: "25%",
          }}
        >
          <Center>
            <Text mb={"5%"} fontWeight={"bold"}>
              {user}
            </Text>
            <Text mb={"1%"} color={"red.600"}>
              {isUpdateValid == "pass" ? "" : "wrong password"}
            </Text>
          </Center>
          <FormControl isRequired>
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
              size="md"
              placeholder="referral (optional)"
              onChangeText={(text) => setReferral(text)}
            />
          </FormControl>
          <Button onPress={updateHandler} small primary>
            <Text>Update Profile</Text>
          </Button>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
