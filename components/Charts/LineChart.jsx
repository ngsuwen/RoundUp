import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit'
 

export default function LineChartComponent() {

    const linedata = {
        labels: ["January", "February", "March", "April", "May", "June","July"],
        datasets: [
          {
            data: [20, 25, 21, 30, 50, 70, 100],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ],
        legend: ["Net Worth"] // optional
      }

  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height*0.3

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(163, 71, 165, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

  return (
        <LineChart
            data={linedata}
            width={screenWidth}
            height={screenHeight}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
        />
  )}


 