import * as React from "react";
import { NativeBaseProvider, View, Box, Button } from "native-base";
import { Dimensions } from "react-native";
import Carousel from "pinar";
import LineChartComponent from "../../Charts/cashLineChart";
import PieChartComponent from "../../Charts/cashPieChart";
import AccordionList from "../../Accordion/cashAccordion";
import MonthSelector from "../../Picker/monthPicker";

export default function IndexCashPage({navigation}) {
  // useState for total amount of the month
  const [total, setTotal]=React.useState(0)

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
          <View pl={3}>
            <PieChartComponent />
          </View>
          <View>
            <LineChartComponent />
          </View>
        </Carousel>
        <Box height="10%" px={6}>
          <MonthSelector navigation={navigation} total={total} dir="Cash"/>
        </Box>
        <Box height="50%" px={6}>
          <AccordionList setTotal={setTotal}/>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}