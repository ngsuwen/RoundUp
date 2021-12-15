import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button} from 'react-native';
import { NativeBaseProvider, Box } from 'native-base'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
 

export default function Showpage({ navigation }) {

    const piedata = [
        { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
      ]

    const linedata = {
        labels: ["January", "February", "March", "April", "May", "June"],
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
  };
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.linechart}>
    <LineChart
        data={linedata}
        width={screenWidth}
        height={screenHeight}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
    />
    </View>
    <PieChart
        data={piedata}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
    />
      <Text>Show page</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linechart:{
    margin:'5%',
  }
})
