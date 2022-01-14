import React from "react";
import { ScrollView } from "react-native";
import { Accordion, NativeBaseProvider, Center, Box, Text } from "native-base";

function AccordionComponent() {
  return (
    <Box m={3}>
      <Accordion allowMultiple>
      <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          <Text fontWeight="bold">
            Introduction
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          {/* <Accordion.Summary _expanded={{ backgroundColor: 'coolGray.600' }}> */}
            <Text fontWeight="bold">
              What are the features?
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
            As a basic user, you can track your inflow (Money In) and outflow (Money Out) of cash. As a premium user, you can track your Investment for cyptocurrencies and stocks.
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
            <Text fontWeight="bold">
            Which stock markets are available for tracking?
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
            Currently, only the US market is available. 
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
            <Text fontWeight="bold">
            Why is the data not updated?
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
            After you have created / edited / deleted entries, it takes time to update our database. Please give the app a few seconds to reflect the changes. 
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
            <Text fontWeight="bold">
            Why is the line graph at Investment page not updated?
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
            The line graph will only be updated once everyday at 4pm. Entries created / edited / deleted after 4pm will have to wait for the next day to be reflected.
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
export default function About() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#fff">
        <ScrollView>
          <AccordionComponent />
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
