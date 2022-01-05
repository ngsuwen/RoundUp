// data is not loading due to state not rerendering

import React from 'react';
import { useState, useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';

export default function tickerDataCard() {

    const { investmentTickerContext,investmentContext} = useContext(DataContext)

    const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
    const [tickerData,setTickerData] = investmentTickerContext

    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height

    const styles = StyleSheet.create({
    wrapper: {
    flexDirection:'column',
    width: screenWidth*0.90,
    height: screenHeight*0.20,
    backgroundColor: '#F7F6F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: '5%',
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    },
    // pressableWrapper: {
    // display:'flex',
    // height:'30%',
    // width:'100%',
    // flexDirection:'row',
    // alignItems:'stretch',
    // justifyContent:'center',
    // borderRadius: 5,
    // margin: '5%',
    // },
    // pressable: {
    // flex:1,
    // backgroundColor: '#F4E6E6',
    // justifyContent:'center',
    // alignItems:'center',
    // borderRadius: 5,
    // padding: '2%',
    // marginLeft: '2%',
    // marginRight: '2%',
    // },
    })

    // have to useEffect to rerender tickerData as it will only update the next render

    useEffect(()=>{
    renderTickerData()
    },[tickerData])

    const renderTickerData = () => {
            return(
                <>
                <Text>{tickerData.ticker}</Text>
                <View>
                    <Text>Current Price: ${tickerData.currentPrice}</Text>
                    <Text>Cost Basis: ${tickerData.costBasis}</Text>
                    <Text>Quantity: {tickerData.currentStockQty} units</Text>
                    <Text>Total Amount Paid: ${tickerData.totalAmountPaid}</Text>
                    <Text>Unrealized P/L: ${tickerData.unrealizedPL}</Text>
                </View>
                </>
            )
    }

    return (
        <View style={styles.wrapper}>
        {renderTickerData()}
        {console.log('tickerdata in datacard:',tickerData)}
        </View>
    )
  }

