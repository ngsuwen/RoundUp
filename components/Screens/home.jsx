import * as React from "react";
import { Dimensions } from "react-native";
import { View, NativeBaseProvider, Box, Spinner, Center } from "native-base";
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
  const { userContext, expenseForceRenderContext, investmentAccordionForceRenderContext } = React.useContext(DataContext);
  const [user, setUser] = userContext;
  const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;
  const [cashYearlyData, setCashYearlyData] = React.useState([0,0,0,0])
  const [expenseYearlyData, setExpenseYearlyData] = React.useState([0,0,0,0])
  const [investmentYearlyData, setInvestmentYearlyData] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [networthYearlyData, setNetworthYearlyData] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])

  async function calculateData() {
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
      const total = Number(cashData[i])+Number(investData[i])-Number(expenseData[i])
      networthData.push(total)
    }
    setCashYearlyData(cashData)
    setExpenseYearlyData(expenseData)
    setInvestmentYearlyData(investData)
    setNetworthYearlyData(networthData)
    return
  }
  
  React.useEffect(async()=>{
    await calculateData()
  },[expenseForceRender, investmentAccordionForceRender])

  return (
    <NativeBaseProvider>
      {expenseYearlyData.length<12?
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

