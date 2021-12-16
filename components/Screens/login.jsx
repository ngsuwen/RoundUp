import React from "react";
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
} from "native-base";

export default function About({ navigation }) {
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
            {/* Replace with logo if have */}
            <Heading mb="5">Round Up</Heading>
          </Center>
          <FormControl isRequired>
            <Input size="md" placeholder="username or email" />
            <Input size="md" placeholder="password" />
          </FormControl>
          <Button small primary>
            <Text>Log In</Text>
          </Button>
          <Center>
            <Text>Don't have an account?
                {/* Link to be updated */}
                <Pressable onPress={() => navigation.navigate("About")}>
                <Text color={"cyan.600"} fontWeight={'bold'}>  Sign up</Text>
                </Pressable>
            </Text>
          </Center>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
}
