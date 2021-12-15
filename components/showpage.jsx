import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base'
import Carousel from "pinar";
import LineChartComponent from './Charts/LineChart';
import PieChartComponent from './Charts/PieChart';
import Entries from './Entries/entries';

export default function Showpage({ navigation }) {

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    height:screenHeight,
  },
  carousel:{
    flex:1,
    width: screenWidth,
    backgroundColor:'white',
  },
  carouselContainer:{
    height: screenHeight*0.28,
    marginBottom:'5%',
  },
  dotStyle:{
    backgroundColor: "#F5E0EE",
      width: 8,
      height: 8,
      borderRadius:4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    },
    activeDotStyle: {
      backgroundColor: "#F49BD6",
      width: 8,
      height: 8,
      borderRadius:4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    },
  })

  return (
    <View style={styles.container}>
      <Carousel showsControls={false} style={styles.carousel} containerStyle={styles.carouselContainer} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
        <PieChartComponent/>
        <LineChartComponent/>
      </Carousel>
      <Entries/>
    </View>
  )
}

