import React from "react";
import {
  HStack,
  Center,
  Text,
  View,
  Pressable,
  NativeBaseProvider,
  Divider,
  VStack,
  Button
} from "native-base";
import { EvilIcons, AntDesign } from "@expo/vector-icons";

export default function homepageCashCard({ navigation }) {
  return (
    <NativeBaseProvider>
      <Center
        bgColor="#fff"
        flex={1}
        borderColor="coolGray.300"
        borderWidth={1}
        mx={2}
        my={1}
        borderRadius={10}
        shadow={4}
      >
        <Center
          flex={1}
          width={"100%"}
          height={"100%"}
          style={{ position: "absolute", zIndex: 10 }}
          bg="white:alpha.80"
        >
          <VStack
            space={3}
            alignItems="center"
            justifyContent="center"
            pl={5}
            pr={3}
          >
            <AntDesign name="lock" size={24} color="black" />
            <Button variant="outline" colorScheme="dark" onPress={()=>navigation.navigate("Profile")}>
            <Text fontSize="sm" color="coolGray.800">
              Unlock Premium
            </Text>
            </Button>
          </VStack>
        </Center>
        <HStack mb="2" width="85%" justifyContent="space-between">
          <Text fontWeight="bold">Investment</Text>
          <Text onPress={() => navigation.navigate("About")}>
            See all <AntDesign name="right" size={14} color="black" />
          </Text>
        </HStack>
        <Divider width="100%" />
        <HStack
          width="85%"
          justifyContent="space-between"
          mt="2"
          _text={{
            color: "coolGray.800",
          }}
        >
          <View>
            <Text>$50403.34</Text>
            <Text mt={0.5}>
              % Change: <Text color="emerald.600">+23.45</Text>
            </Text>
          </View>
          <View justifyContent="center">
            <Pressable onPress={() => navigation.navigate("About")}>
              <EvilIcons name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}
