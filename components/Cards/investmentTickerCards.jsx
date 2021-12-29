import { InfoIcon } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';


// comma and dp for stock and crypto prices, if not formatted from api 
// all currency in usd
// need to check api data if percentage change will be negative value

export default function investmentTickerCard() {


    const stockData = [
        {
            ticker:'TSLA',
            name:'Tesla Inc',
            price:1100,
            percentagechange:5,
            pricechange:30
        },
        {
            ticker:'AAPL',
            name:'Apple Inc',
            price:160,
            percentagechange:3.5,
            pricechange:30
        }
    ]

    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height

    const styles = StyleSheet.create({
    wrapper: {
    flex: 1,
    flexDirection:'column',
    width: screenWidth*0.9,
    backgroundColor: '#F7F6F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: '3%',
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    },
    infoWrapper:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'yellow',
    width:screenWidth*0.7,
    justifyContent:'space-between',
    alignItems:'center',
    margin:'2%',
    },
    tickernamewrapper: {
    flexDirection:'column',
    },
    ticker:{
    fontWeight:'bold',
    },
    name:{
    fontSize: 9,
    },
    price:{
    },
    pressableWrapper: {
    display:'flex',
    height:'30%',
    width:'100%',
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'center',
    borderRadius: 5,
    margin: '5%',
    },
    pressable: {
    flex:1,
    backgroundColor: '#F4E6E6',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    padding: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    },
    })

    const stockCards = stockData.map((stock,index)=>{
        return (
        <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate('About')}>
                <View style={styles.infoWrapper}>
                    <View style={styles.tickernamewrapper}>
                        <Text style={styles.ticker}>{stock.ticker}</Text>
                        <Text style={styles.name}>{stock.name}</Text>
                    </View>
                    <View>
                         <Text>${stock.price}</Text>
                    </View>
                    <View>
                        {/* need to check api data if percentage change will be negative value */}
                        <Text style={{color:stock.percentagechange>=0?'green':'red'}}>{stock.percentagechange}%</Text>
                    </View>
                    <View>
                    {/* using percentage change for color as price change may not be a negative number depending on api data */}
                    <Text style={{color:stock.percentagechange>=0?'green':'red'}}>${stock.pricechange}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
        )
    })
    
    return (
    <>
      {stockCards}
    </>
    )
  }
  