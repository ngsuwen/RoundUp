import React from "react";
import {
  HStack,
  Center,
  Text,
  View,
  Pressable,
  NativeBaseProvider,
  Divider,
} from "native-base";
import { EvilIcons, AntDesign } from "@expo/vector-icons";

export default function homepageCashCard({ navigation }) {
  return (
    <NativeBaseProvider>
      <Center bgColor="#fff" flex={1} borderColor="coolGray.300" borderWidth={1} mx={2} mb={1} borderRadius={10} shadow={4}>
        <HStack
          mb="2"
          width="85%"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">Cash</Text>
          <Text onPress={() => navigation.navigate("Index Cash Page")}>See all <AntDesign name="right" size={14} color="black" /></Text>
        </HStack>
        <Divider width="100%"/>
        <HStack
          width="85%"
          justifyContent="space-between"
          mt="2"
          _text={{
            color: "coolGray.800",
          }}
        >
          <View>
            <Text>$10403.34</Text>
            <Text mt={0.5}>% Change: <Text color="red.600">-12.87</Text></Text>
          </View>
          <View justifyContent="center">
            <Pressable onPress={() => navigation.navigate("Entry Cash Page")}>
              <EvilIcons name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}
