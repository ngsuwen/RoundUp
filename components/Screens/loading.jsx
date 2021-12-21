import React from "react";
import { Spinner, Center, NativeBaseProvider } from "native-base";

export default function Loading(){
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" alignItems="center">
          <Spinner color="cyan.500" />
      </Center>
    </NativeBaseProvider>
  );
};
