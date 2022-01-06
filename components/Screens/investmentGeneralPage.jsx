// need to do summation based on daily entry, that means having more than one entry consolidated per day with summation and breakdown of daily expenses
// search icon, 
// icon for category
// link to edit/delete page for every entry 
// show total expense/savings/investments for that month above graph 

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native'
import { NativeBaseProvider, Box } from 'native-base'
import Carousel from "pinar"
import InvestmentLineChartComponent from '../Charts/investmentLineChart'
import PieChartComponent from '../Charts/investmentPieChart'
import InvestmentTickerCards from '../Cards/investmentTickerCards'

export default function GeneralBreakdownPage() {

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    height:screenHeight,
  },
  cardContainer: {
    flex:2,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff',
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
        <InvestmentLineChartComponent/>
      </Carousel>
      <View style={styles.cardContainer}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <InvestmentTickerCards/>
      </ScrollView>
      </View>
    </View>
  )
}

