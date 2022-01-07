import React from "react";
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

export default function networthLineChartComponent({dataMonth, networthYearlyData, monthArr, todayDate}) {
  const linedata = {
    labels: dataMonth,
    datasets: [
      {
        data: networthYearlyData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [
      `NETWORTH, ${monthArr[todayDate.getMonth() + 1]} ${
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
    <LineChart
      data={linedata}
      width={screenWidth}
      height={screenHeight * 0.25}
      chartConfig={chartConfig}
      bezier
    />
  );
}
