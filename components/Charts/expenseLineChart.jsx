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

export default function expenseLineChartComponent({dataMonth, expenseYearlyData, monthArr, todayDate}) {

  let count = 0;

  for(let i=0; i<12; i++){ 
    count += Number(expenseYearlyData[i]); 
  }

  const linedata = {
    labels: count==0?['No Data Available']:dataMonth,
    datasets: [
      {
        data: count==0?[0]:expenseYearlyData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [`MONEY OUT, ${monthArr[todayDate.getMonth()+1]} ${todayDate.getFullYear()-1} - ${monthArr[todayDate.getMonth()]} ${todayDate.getFullYear()}`], // optional
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
