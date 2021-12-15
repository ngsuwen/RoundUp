import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base'
import LineChartComponent from './Charts/LineChart';
import PieChartComponent from './Charts/PieChart';
import Carousel from "pinar";

export default function Showpage({ navigation }) {

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height*0.3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  carousel:{
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor:'white'
  },
  list:{
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor:'#efd3d7'
  }
})

  return (
    <SafeAreaView style={styles.container}>
      <Carousel showsControls={false} style={styles.carousel}>
        <PieChartComponent/>
        <LineChartComponent/>
      </Carousel>
      <Text style={styles.list}>List Items</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

