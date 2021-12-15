import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit'
 

export default function PieChartComponent() {

    const piedata = [
        { name: 'Food', population: 21500000, color: '#ada7ff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Transport', population: 2800000, color: '#8e94f2', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Beauty', population: 527612, color: '#8187dc', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Utilities', population: 8538000, color: '#cbb2fe', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Insurance', population: 11920000, color: '#e0c3fc', legendFontColor: '#7F7F7F', legendFontSize: 15 }
      ]

  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

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

  return (
        <PieChart
            data={piedata}
            width={screenWidth}
            height={screenHeight*0.2}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
        />
  )}


  