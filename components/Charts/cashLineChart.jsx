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
const todayMonth = todayDate.getMonth();

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
  const linedata = {
    labels: dataMonth,
    datasets: [
      {
        data: [20, 25, 21, 30, 50, 70, 100, 20, 25, 21, 30, 50],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [`MONEY IN, ${monthArr[todayDate.getMonth()+1]} ${todayDate.getFullYear()-1} - ${monthArr[todayDate.getMonth()]} ${todayDate.getFullYear()}`], // optional
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
