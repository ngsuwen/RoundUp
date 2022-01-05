import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, ScrollView } from 'react-native'
import { NativeBaseProvider, Box } from 'native-base'
import Carousel from "pinar"
import ExpenseLineChartComponent from '../../Charts/expenseLineChart'
import TickerDataCard from '../../Cards/tickerDataCard'
import AccordionList from '../../Accordion/investmentAccordion'


export default function TickerBreakdownPage({ navigation, route }) {

const { selectedTickerAndPrice } = route.params
console.log('selectedt&p:',selectedTickerAndPrice)

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    height:screenHeight,
  },
  accordion:{
    flex: 2,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:10,
    marginRight:10,
  },
  monthSelector:{
    flex:0.25,
    borderRadius:10,
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
      {/* <Carousel showsControls={false} style={styles.carousel} containerStyle={styles.carouselContainer} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}> */}
        <TickerDataCard/>
        {/* <ExpenseLineChartComponent/> */}
      {/* </Carousel> */}
      <View style={styles.accordion}>
      <AccordionList selectedTickerAndPrice={selectedTickerAndPrice}/>
      </View>
    </View>
  )
}

