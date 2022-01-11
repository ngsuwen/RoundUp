import React from "react";
import { ScrollView } from "react-native";
import { Accordion, NativeBaseProvider, Center, Box } from "native-base";

function AccordionComponent() {
  return (
    <Box m={3}>
      <Accordion allowMultiple>
      <Accordion.Item>
          <Accordion.Summary>
            Introduction
            <Accordion.Icon />
          </Accordion.Summary>
          <Accordion.Details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary>
          {/* <Accordion.Summary _expanded={{ backgroundColor: 'coolGray.600' }}> */}
            What are the features?
            <Accordion.Icon />
          </Accordion.Summary>
          <Accordion.Details>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary>
            Which stock markets are available for tracking?
            <Accordion.Icon />
          </Accordion.Summary>
          <Accordion.Details>
            Currently, only the US market is available. 
          </Accordion.Details>
        </Accordion.Item>
                <Accordion.Item>
          <Accordion.Summary>
            Why is my Investment/ networth showing up 0?
            <Accordion.Icon />
          </Accordion.Summary>
          <Accordion.Details>
            It takes time to load the investment data from our server. Please give it roughly another 20s to connect after the page has loaded. We hope to seek your understanding. 
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
