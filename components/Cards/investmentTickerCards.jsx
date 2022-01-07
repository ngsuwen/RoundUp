import React, { useEffect, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';
const _ = require('underscore')


// comma and dp for stock and crypto prices, if not formatted from api 
// all currency in sgd
// need to check api data if percentage change will be negative value
// do up forcerender?

export default function investmentTickerCard() {

const navigation = useNavigation()

const { investmentContext, userContext, tickerAndPriceContext,investmentGPContext,investmentContextRawData } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [fetchedInvestmentEntriesRawData,setFetchedInvestmentEntriesRawData] = investmentContextRawData
const [tickerAndPrice,setTickerAndPrice] = tickerAndPriceContext
const [user, setUser] = userContext


    useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
        fetchInvestments()
        })
        return resetPage
    },[])

    const fetchInvestments = async () => {
        const userid = user
        const fetchData = await fetch(`https://roundup-api.herokuapp.com/data/investment/user/${userid}`)
        const parsedData = await fetchData.json()
        setFetchedInvestmentEntriesRawData(parsedData)
        // grouping fetched data by ticker symbol 
        const entriesByTicker = _(parsedData).groupBy((element)=>{
            const groupedTicker = element.investmentsentry.ticker.toUpperCase()
            return groupedTicker
        })
        // console.log('entriesByTicker:',entriesByTicker)
        setFetchedInvestmentEntries(entriesByTicker) // ran but state will only update the next render... so fetchStockPrice() should not depend on state but rather a separate array that cna be passed into the function so you dont have to wait for the next render
        fetchStockPrice(entriesByTicker)
       }


    const fetchStockPrice = async (entriesByTicker) => { 

    const tickerList = Object.keys(entriesByTicker).sort()
    console.log('tickerlist:',tickerList) // ran but empty array as fetchedInvestmentEntries state is only updated the next render, hence tickerandpricestate will still be empty. Solved by passing entriesByTicker as variable instead.

    const tickerAndPriceArr = [] 

    for (let ticker of tickerList){

        const priceFetcher = async () => {
            if(entriesByTicker[ticker][0]['investmentsentry']['category']==='US stocks'){
                const stockprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/stocks/${ticker}/current`)
                const parsedStockPriceObj = await stockprice.json()
                parsedStockPriceObj['ticker']=ticker
                let totalStockQty = 0 
                const totalStockQtyCalculator = parsedStockPriceObj['quantity']=entriesByTicker[ticker].forEach((transaction,index)=>{
                    totalStockQty+=transaction.investmentsentry.quantity
                })
                parsedStockPriceObj['quantity']=totalStockQty
                parsedStockPriceObj['category']='US stocks'
                return parsedStockPriceObj
            }
            
            if(entriesByTicker[ticker][0]['investmentsentry']['category']==='Crypto'){
                const cryptoprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/crypto/${ticker.toLowerCase()}/current`)
                const parsedCryptoPriceObj = await cryptoprice.json()
                // uppercase as crypto ticker is lowercase due to api requirements
                parsedCryptoPriceObj['ticker']=ticker

                let totalCryptoQty = 0 
                const totalCryptoQtyCalculator = parsedCryptoPriceObj['quantity']=entriesByTicker[ticker].forEach((transaction,index)=>{
                    totalCryptoQty+=transaction.investmentsentry.quantity
                })
                parsedCryptoPriceObj['quantity']=totalCryptoQty
                parsedCryptoPriceObj['category']='Crypto'
                return parsedCryptoPriceObj
            }
        }

        const fetchedPrice = await priceFetcher()
        console.log('fetchedprice:',fetchedPrice)
        tickerAndPriceArr.push(fetchedPrice)
       
        }

    setTickerAndPrice(tickerAndPriceArr)
    }


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
    // backgroundColor:'yellow',
    width:screenWidth*0.7,
    justifyContent:'space-between',
    alignItems:'center',
    margin:'2%',
    },
    tickernamewrapper: {
    flexDirection:'column',
    },
    stockpricewrapper: {
    alignSelf:'flex-end'
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



    const stockCards = tickerAndPrice.map((stock,index)=>{
        return (
        <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate('Show Ticker Page', {selectedTickerAndPrice: stock})}>
                <View style={styles.infoWrapper}>
                    <View style={styles.tickernamewrapper}>
                        <Text style={styles.ticker}>{stock.ticker}</Text>
                        {/* <Text style={styles.name}>{stock.name}</Text> */}
                    </View>
                    <View style={styles.stockpricewrapper}>
                         <Text>$ {stock.value}</Text>
                    </View>
                    <View>
                        {/* need to check api data if percentage change will be negative value */}
                        {/* <Text style={{color:stock.percentagechange>=0?'green':'red'}}>{stock.percentagechange}%</Text> */}
                    </View>
                    <View>
                    {/* using percentage change for color as price change may not be a negative number depending on api data */}
                    {/* <Text style={{color:stock.percentagechange>=0?'green':'red'}}>${stock.pricechange}</Text> */}
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
  