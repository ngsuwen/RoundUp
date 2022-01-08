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

export default function homepageCashCard({ navigation, cashYearlyData }) {
  
  const calculateChange=()=>{
    let change = ((Number(cashYearlyData[11])-Number(cashYearlyData[10]))/Number(cashYearlyData[10])*100).toFixed(2)
    if (cashYearlyData[10]==0){
      return <Text color="emerald.600">+{cashYearlyData[11]}</Text>
    } else if (change>0){
      return <Text color="emerald.600">+{change}</Text>
    } else if (change<0){
      return <Text color="red.600">{change}</Text>
    } else {
      return <Text color="coolGray.400">{change}</Text>
    }
  }

  calculateChange()

  return (
    <NativeBaseProvider>
      <Center bgColor="#fff" flex={1} borderColor="coolGray.300" borderWidth={1} mx={2} mb={1} borderRadius={10} shadow={4}>
        <HStack
          mb="2"
          width="85%"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">Money In</Text>
          <Text onPress={() => navigation.navigate("Money In")}>See all <AntDesign name="right" size={14} color="black" /></Text>
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
            <Text>${cashYearlyData[11]}</Text>
            <Text mt={0.5}>% Change: {calculateChange()}</Text>
          </View>
          <View justifyContent="center">
            <Pressable onPress={() => navigation.navigate("Add Money In")}>
              <EvilIcons name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}
