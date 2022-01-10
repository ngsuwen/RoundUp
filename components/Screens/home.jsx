import * as React from "react";
import { Dimensions } from "react-native";
import { View, NativeBaseProvider, Box, HStack, Spinner, Text, Center, Heading } from "native-base";
import { Image } from "react-native";
import NetworthLineChartComponent from "../Charts/networthLineChart";
import ExpenseLineChartComponent from "../Charts/expenseLineChart";
import CashLineChartComponent from "../Charts/cashLineChart";
import InvestmentLineChartComponent from "../Charts/investmentLineChart";
import Carousel from "pinar";
import HomePageCashCard from "../Cards/homepageCashCard";
import HomePageExpenseCard from "../Cards/homepageExpenseCard";
import HomePageInvestmentCard from "../Cards/homepageInvestmentCard";
import yearlyCash from "../api/yearlyCash";
import yearlyExpense from "../api/yearlyExpense";
import yearlyInvestment from "../api/yearlyInvestment";
import DataContext from "../../context/DataContext";

const monthArr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
  "JAN",
];
const dataMonth = [];
const todayDate = new Date();
let todayMonth = todayDate.getMonth();

if (todayMonth != 11) {
  for (let i = todayMonth + 1; i < 12; i++) {
    if (i % 2 === 0) {
      dataMonth.push(monthArr[i]);
    } else {
      dataMonth.push("");
    }
  }
}
for (let i = 0; i <= todayMonth; i++) {
  if (i % 2 === 0) {
    dataMonth.push(monthArr[i]);
  } else {
    dataMonth.push("");
  }
}

const screenHeight = Dimensions.get("screen").height;
const carouselHeight = screenHeight * 0.36;

const style = {
  dotStyle: {
    backgroundColor: "#F5E0EE",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin:3
  },
  activeDotStyle: {
    backgroundColor: "#F49BD6",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3
  },
};

export default function Home({ navigation }) {
  const { userContext, expenseForceRenderContext } = React.useContext(DataContext);
  const [user, setUser] = userContext;
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;
  const [cashYearlyData, setCashYearlyData] = React.useState([0,0,0,0])
  const [expenseYearlyData, setExpenseYearlyData] = React.useState([0,0,0,0])
  const [investmentYearlyData, setInvestmentYearlyData] = React.useState([0,0,0,0])
  const [networthYearlyData, setNetworthYearlyData] = React.useState([0,0,0,0])

  async function calculateData(num) {
    let month;
    if (todayMonth + 1 < 10) {
      let strMonth = todayMonth + 1;
      month = "0" + strMonth;
    }
    const date = todayDate.getFullYear() + '-' + month
    const cashData = await yearlyCash(user, date)
    const expenseData = await yearlyExpense(user, date)
    const investData = await yearlyInvestment(user, date)
    const networthData = []
    for (let i=0;i<12;i++){
      // change expense to investment
      const total = Number(cashData[i])+Number(investData[i])
      networthData.push(total)
    }
    const dataArr = [cashData, expenseData, investData, networthData]
    return dataArr[num]
  }
  
  React.useEffect(async()=>{
    setCashYearlyData(await calculateData(0))
    setExpenseYearlyData(await calculateData(1))
    setInvestmentYearlyData(await calculateData(2))
    setNetworthYearlyData(await calculateData(3))
  },[expenseForceRender])

  return (
    <NativeBaseProvider>
      {networthYearlyData.length<12?
        <Center bgColor="#fff" flex={1} px="3" alignItems="center">
          <Spinner color="cyan.500" mb={10}/>
        </Center>
        :
        <Box bgColor="#fff" height="100%">
        <Carousel height={carouselHeight} showsControls={false} dotStyle={style.dotStyle} activeDotStyle={style.activeDotStyle}>
          <View>
            <NetworthLineChartComponent dataMonth={dataMonth} networthYearlyData={networthYearlyData} monthArr={monthArr} todayDate={todayDate}/>
          </View>
          <View>
            <CashLineChartComponent dataMonth={dataMonth} cashYearlyData={cashYearlyData} monthArr={monthArr} todayDate={todayDate}/>
          </View>
          <View>
            <ExpenseLineChartComponent dataMonth={dataMonth} expenseYearlyData={expenseYearlyData} monthArr={monthArr} todayDate={todayDate}/>
          </View>
          <View>
            <InvestmentLineChartComponent dataMonth={dataMonth} investmentYearlyData={investmentYearlyData} monthArr={monthArr} todayDate={todayDate}/>
          </View>
        </Carousel>
        <Box height="55%" px={2}>
          <HomePageCashCard navigation={navigation} cashYearlyData={cashYearlyData} />
          <HomePageExpenseCard navigation={navigation} expenseYearlyData={expenseYearlyData} />
          <HomePageInvestmentCard navigation={navigation} investmentYearlyData={investmentYearlyData}/>
        </Box>
      </Box>}
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
