import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';
import { NativeBaseProvider, Pressable } from 'native-base';
import NetworthLineChartComponent from './Charts/networthLineChart';
import ExpenseLineChartComponent from './Charts/expenseLineChart';
import CashLineChartComponent from './Charts/cashLineChart';
import InvestmentLineChartComponent from './Charts/investmentLineChart';
import Carousel from "pinar";
import HomePageCashCard from './Cards/homepageCashCard'
import HomePageExpenseCard from './Cards/homepageExpenseCard'
import HomePageInvestmentCard from './Cards/homepageInvestmentCard'

export default function Home({ navigation }) {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      flex:2,
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#fff',
      padding: '7%',
    },
    pressable: {
      backgroundColor: 'salmon',
      borderRadius: 5,
      padding: '2%',
      margin: '5%',
    },
    text:{
      color:'#fff'
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
  });
  


  return (
    <>
    <View style={styles.container}>
      <Carousel showsControls={false} style={styles.carousel} containerStyle={styles.carouselContainer} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
        <NetworthLineChartComponent/>
        <ExpenseLineChartComponent/>
        <InvestmentLineChartComponent/>
        <CashLineChartComponent/>
      </Carousel>
    </View>

    <View style={styles.cardContainer}>
    <HomePageCashCard/>
    <HomePageExpenseCard/>
    <HomePageInvestmentCard/>
    </View>
    </>
  )
}

// {/* button component can't be styled so we use a pressable component */}
// <NativeBaseProvider>
// {/* <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
//   <Text style={styles.text}>Go to About</Text>
// </Pressable> */}
// </NativeBaseProvider>

