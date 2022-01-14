import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { Accordion, NativeBaseProvider, Center, Box, Text } from "native-base";

function AccordionComponent() {

  const screenWidth = Dimensions.get("screen").width;

  return (
    <Box mt={5} width={screenWidth*0.9}>
      <Accordion allowMultiple>
      <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          <Text fontWeight="bold">
            Introduction
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
          The RoundUp App allows user to track their networth, income, expenses and investments all in one app, which solves the painpoint of the conventional budgeting app where tracking of investments is usually not supported.
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
            Why is the line graph not updating at the Investment page?
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
          The line graph will only be updated once everyday around 5-5:30am SGT. Entries created / edited / deleted after 5:30am SGT will have to wait for the next day to be reflected.
          </Accordion.Details>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Summary _expanded={{ backgroundColor: "coolGray.300" }}>
          <Text fontWeight="bold">
            The Team
            </Text>
            <Accordion.Icon color="black"/>
          </Accordion.Summary>
          <Accordion.Details>
          This app is a group effort by Ng Su Wen, Qamarul Arifin and Kang Shi Zheng. 
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
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <AccordionComponent />
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
