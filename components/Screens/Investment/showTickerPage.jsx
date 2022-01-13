import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { NativeBaseProvider, Box, Button, Center } from "native-base";
import Carousel from "pinar";
import ExpenseLineChartComponent from "../../Charts/expenseLineChart";
import TickerDataCard from "../../Cards/tickerDataCard";
import AccordionList from "../../Accordion/investmentAccordion";
import MonthSelector from "../../Picker/monthPicker";
import yearlyInvestment from "../../api/yearlyInvestment";

export default function TickerBreakdownPage({ navigation }) {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      height: screenHeight,
    },
    accordion: {
      flex: 2,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
      marginRight: 10,
    },
    monthSelector: {
      flex: 0.25,
      borderRadius: 10,
    },
    carousel: {
      flex: 1,
      width: screenWidth,
      backgroundColor: "white",
    },
    carouselContainer: {
      height: screenHeight * 0.28,
      marginBottom: "5%",
    },
    dotStyle: {
      backgroundColor: "#F5E0EE",
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    activeDotStyle: {
      backgroundColor: "#F49BD6",
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
  });

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
                Add Entry
              </Button>
            </Button.Group>
          </Center>
        </Box>
        <Box height="50%" px={6}>
          <AccordionList />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
