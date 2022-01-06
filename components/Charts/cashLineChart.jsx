import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import yearlyCash from "../api/yearlyCash";
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

export default function cashLineChartComponent() {
  const { userContext } = React.useContext(DataContext);
  const [user, setUser] = userContext;
  const [cashYearlyData, setCashYearlyData] = React.useState([0,0,0,0,0,0,0,0,0,0,0,0])
  async function calculateData() {
    let month;
    if (todayMonth + 1 < 10) {
      todayMonth += 1;
      month = "0" + todayMonth;
    }
    const date = todayDate.getFullYear() + '-' + month
    const data = await yearlyCash(user, date)
    return data
  }
  
  React.useEffect(async()=>{
    setCashYearlyData(await calculateData())
  },[])

  const linedata = {
    labels: dataMonth,
    datasets: [
      {
        data: cashYearlyData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [
      `MONEY IN, ${monthArr[todayDate.getMonth() + 1]} ${
        todayDate.getFullYear() - 1
      } - ${monthArr[todayDate.getMonth()]} ${todayDate.getFullYear()}`,
    ], // optional
  };

  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(163, 71, 165, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <>
      <LineChart
        data={linedata}
        width={screenWidth}
        height={screenHeight * 0.25}
        chartConfig={chartConfig}
        bezier
      />
    </>
  );
}
