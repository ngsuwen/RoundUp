import React from "react";
import { Heading, Center, NativeBaseProvider } from "native-base";
import { Image } from "react-native";

export default function Loading(){
  return (
    <NativeBaseProvider>
      <Center bgColor="#fff" flex={1} px="3" alignItems="center">
          <Image source={require("../../assets/rounduplogo.png")} style={{height:128,width:128}}/>
          <Heading mb="5">Round Up</Heading>
      </Center>
    </NativeBaseProvider>
  );
};
