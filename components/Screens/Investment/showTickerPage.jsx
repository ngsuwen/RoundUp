import * as React from "react";
import { NativeBaseProvider, Box, Button, Center } from "native-base";
import TickerDataCard from "../../Cards/tickerDataCard";
import AccordionList from "../../Accordion/investmentAccordion";

export default function TickerBreakdownPage({ navigation }) {

  return (
    <NativeBaseProvider>
      <Box bgColor="#fff" height="100%">
        <TickerDataCard />
        <Box height="10%" px={6}>
          <Center>
            <Button.Group>
            <Button
                variant="outline"
                colorScheme="light"
                onPress={() => navigation.navigate("Investment")}
              >
                Back
              </Button>
              <Button
                variant="outline"
                colorScheme="light"
                onPress={() => navigation.navigate("Entry Investment Page")}
              >
                Add Investment
              </Button>
            </Button.Group>
          </Center>
        </Box>
        <Box height="50%" px={6}>
          <AccordionList/>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
