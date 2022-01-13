import React from "react";
import { NativeBaseProvider, View, Box, Button, Center } from "native-base";
import { Dimensions, ScrollView } from "react-native";
import Carousel from "pinar";
import InvestmentLineChartComponentDaily from "../../Charts/investmentLineChartDaily";
import PieChartComponent from "../../Charts/investmentPieChart";
import InvestmentTickerCards from "../../Cards/investmentTickerCards";

export default function GeneralBreakdownPage({navigation}) {
  const screenHeight = Dimensions.get("screen").height;
  const carouselHeight = screenHeight * 0.34;

  const styles = {
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
  };

  return (
    <NativeBaseProvider>
      <Box bgColor="#fff" height="100%">
        <Carousel
          height={carouselHeight}
          showsControls={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          <View pl={2.5}>
            <PieChartComponent />
          </View>
          <View>
            <InvestmentLineChartComponentDaily />
          </View>
        </Carousel>
        <Box height="10%" px={6}>
          <Center>
            <Button.Group>
              <Button
                variant="outline"
                colorScheme="light"
                onPress={() => console.log("add toggle")}
              >
                Stocks
              </Button>
              <Button
                variant="outline"
                colorScheme="light"
                onPress={() => console.log("add toggle")}
              >
                Crypto
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
        <Box height="45%" px={6}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <InvestmentTickerCards />
          </ScrollView>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
