import * as React from "react";
import { Dimensions } from "react-native";
import { View, NativeBaseProvider, Box } from "native-base";
import NetworthLineChartComponent from "../Charts/networthLineChart";
import ExpenseLineChartComponent from "../Charts/expenseLineChart";
import CashLineChartComponent from "../Charts/cashLineChart";
import InvestmentLineChartComponent from "../Charts/investmentLineChart";
import Carousel from "pinar";
import HomePageCashCard from "../Cards/homepageCashCard";
import HomePageExpenseCard from "../Cards/homepageExpenseCard";
import HomePageInvestmentCard from "../Cards/homepageInvestmentCard";

const screenHeight = Dimensions.get('screen').height
const carouselHeight = screenHeight*0.36

export default function Home({ navigation }) {
  return (
    <NativeBaseProvider>
      <Box bgColor="#fff" height="100%">
        <Carousel height={carouselHeight} showsControls={false}>
          <View>
            <NetworthLineChartComponent />
          </View>
          <View>
            <CashLineChartComponent />
          </View>
          <View>
            <ExpenseLineChartComponent />
          </View>
          <View>
            <InvestmentLineChartComponent />
          </View>
        </Carousel>
        <Box height="55%" px={2}>
        <HomePageCashCard navigation={navigation} />
        <HomePageExpenseCard navigation={navigation} />
        <HomePageInvestmentCard navigation={navigation} />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

// {/* button component can't be styled so we use a pressable component */}
// <NativeBaseProvider>
// {/* <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
//   <Text style={styles.text}>Go to About</Text>
// </Pressable> */}
// </NativeBaseProvider>

// pressable: {
//   backgroundColor: 'salmon',
//   borderRadius: 5,
//   padding: '2%',
//   margin: '5%',
// },
