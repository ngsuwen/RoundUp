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
import DataContext from "../../context/DataContext";

export default function homepageCashCard({ navigation, investmentYearlyData }) {
  
  const { userRoleContext } = React.useContext(DataContext);
  const [userRole, setUserRole] = userRoleContext;
  
  const calculateChange=()=>{
    let change = ((Number(investmentYearlyData[11])-Number(investmentYearlyData[10]))/Number(investmentYearlyData[10])*100).toFixed(2)
    if (investmentYearlyData[10]==0){
      return <Text color="emerald.600">+{investmentYearlyData[11]}</Text>
    } else if (change>0){
      return <Text color="emerald.600">+{change}</Text>
    } else if (change<0){
      return <Text color="red.600">{change}</Text>
    } else {
      return <Text color="coolGray.400">{change}</Text>
    }
  }

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
          style={{ position: "absolute", zIndex: userRole==="BASIC"?10:-10 }}
          bg="white:alpha.80"
        >
        {userRole==="BASIC"?
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
        :""}
        </Center>
        <HStack mb="2" width="85%" justifyContent="space-between">
          <Text fontWeight="bold">Investment</Text>
          <Text onPress={() => navigation.navigate("Investment GP")}>
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
            <Text>${investmentYearlyData[11]}</Text>
            <Text mt={0.5}>% Change: {calculateChange()}</Text>
          </View>
          <View justifyContent="center">
          {/* navigation to be updated */}
            <Pressable onPress={() => navigation.navigate("About")}>
              <EvilIcons name="plus" size={24} color="black" />
            </Pressable>
          </View>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
}
