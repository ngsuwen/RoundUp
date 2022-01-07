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

export default function homepageExpenseCard({ navigation, expenseYearlyData }) {

  const calculateChange=()=>{
    let change = (Number(expenseYearlyData[11])/Number(expenseYearlyData[10])*100).toFixed(2)
    if (change>0){
      return <Text color="emerald.600">+{change}</Text>
    } else if (change<0){
      return <Text color="red.600">-{change}</Text>
    } else {
      return <Text color="coolGray.400">{change}</Text>
    }
  }

  return (
    <NativeBaseProvider>
      <Center bgColor="#fff" flex={1} borderColor="coolGray.300" borderWidth={1} mx={2} my={1} borderRadius={10} shadow={4}>
        <HStack
          mb="2"
          width="85%"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">Money Out</Text>
          <Text onPress={() => navigation.navigate("Money Out")}>See all <AntDesign name="right" size={14} color="black" /></Text>
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
            <Text>${expenseYearlyData[11]}</Text>
            <Text mt={0.5}>% Change: {calculateChange()}</Text>
          </View>
          <View justifyContent="center">
            <Pressable onPress={() => navigation.navigate("Add Money Out")}>
              <EvilIcons name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}
