import React, { useEffect, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';
const _ = require('underscore')


// comma and dp for stock and crypto prices, if not formatted from api 
// all currency in sgd
// need to check api data if percentage change will be negative value

export default function investmentTickerCard() {

const navigation = useNavigation()

const { investmentContext, stockListDistinctContext, userContext, tickerAndPriceContext,investmentGPContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [tickerAndPrice,setTickerAndPrice] = tickerAndPriceContext
const [investmentgpForceRender,setInvestmentgpForceRender] = investmentGPContext
const [user, setUser] = userContext


    useEffect(()=>{
    fetchInvestments()
    },[])

    const fetchInvestments = async () => {
        const userid = user
        const fetchData = await fetch(`https://roundup-api.herokuapp.com/data/investment/user/${userid}`)
        const parsedData = await fetchData.json()
        // grouping fetched data by ticker symbol 
        const entriesByTicker = _(parsedData).groupBy((element)=>{
            const groupedTicker = element.investmentsentry.ticker
            return groupedTicker
        })
        // console.log('entriesByTicker:',entriesByTicker)
        setFetchedInvestmentEntries(entriesByTicker)
        fetchStockPrice()
       }


    const fetchStockPrice = async () => { 

    const tickerList = Object.keys(fetchedInvestmentEntries).sort()
    console.log('tickerlist:',tickerList)

    const tickerAndPriceArr = []

    for (let ticker of tickerList){

        const priceFetcher = async () => {
            if(fetchedInvestmentEntries[ticker][0]['investmentsentry']['category']==='US stocks'){
                const stockprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/stocks/${ticker}/current`)
                const parsedStockPriceObj = await stockprice.json()
                parsedStockPriceObj['ticker']=ticker
                // return addedTickerName
                // .then((currentStockPrice)=>{
                // // adding ticker symbol to obj containing ticker current price

                // console.log('currentstockprice:',parsedStockPriceObj)
                // return currentStockPrice})
                // .catch((err)=>console.log(err))}
                return parsedStockPriceObj
            }
            
            if(fetchedInvestmentEntries[ticker][0]['investmentsentry']['category']==='Crypto'){
                const cryptoprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/crypto/${ticker}/current`)
                const parsedCryptoPriceObj = await cryptoprice.json()
                parsedCryptoPriceObj['ticker']=ticker
                // return addedTickerName
                // .then((currentStockPrice)=>{
                // // adding ticker symbol to obj containing ticker current price

                // console.log('currentcryptoprice:',parsedCryptoPriceObj)
                // return currentStockPrice})
                // .catch((err)=>console.log(err))}
                return parsedCryptoPriceObj
            }
        }

        const fetchedPrice = await priceFetcher()
        console.log('fetchedprice:',fetchedPrice)
        tickerAndPriceArr.push(fetchedPrice)
       
        }

    setTickerAndPrice(tickerAndPriceArr)
    // setInvestmentgpForceRender(!investmentgpForceRender)
    }


    // array of object containing ticker symbol and current price for card rendering


    // const fetchCurrentStockPrice = async () => {

    //     const tickerList = Objt.keys(fetchedInvestmentEntries).sort()
    //     // problem is that foreach is not done pushing and then you're trying to setstate
    //     const tickerAndPriceArr = await Promise.all(tickerList.map(async(ticker,index)=>{
    //         // need to check category before fetching current price
    //         if(fetchedInvestmentEntries[ticker][0]['investmentsentry']['category']==='US stocks'){
    //         const stockPrice = await fetch(`https://roundup-api.herokuapp.com/data/investment/stocks/${ticker}/current`)
    //         .then(data=>data.json())
    //         .then((currentStockPrice)=>{
    //         // adding ticker symbol to obj containing ticker current price
    //         currentStockPrice['ticker']=ticker
            
    //         // console.log('ticker&pricearr:',tickerandpricearr)
    //         // setTickerAndPrice([...tickerAndPrice,currentStockPrice])
    //         })
    //         .catch((err)=>console.log(err))
    //         }

    //         if(fetchedInvestmentEntries[ticker][0]['investmentsentry']['category']==='Crypto'){
    //         await fetch(`https://roundup-api.herokuapp.com/data/investment/crypto/${ticker}/current`,{
    //         })
    //         .then(data=>data.json())
    //         .then((currentCryptoPrice)=>{
    //         currentCryptoPrice['ticker']=ticker
    //         console.log(currentCryptoPrice)
    //         return currentCryptoPrice
    //         // console.log('ticker&pricearr:',tickerandpricearr)
    //         // setTickerAndPrice([...tickerAndPrice,currentCryptoPrice])
    //        })
    //         .catch((err)=>console.log(err))
    //         }
    //     }))

    // }

    console.log('tickerandpricestate:',tickerAndPrice)

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

    ////// TO ACCESS EACH TRANSACTION OF EACH TICKER //////
    // const tickerList = Object.keys(fetchedInvestmentEntries).sort()
    // console.log('tickerlist:',tickerList)
    // tickerList.forEach((element,index)=>{
    //     // accessing object with its element (ticker symbol) which contains an array (use forEach to lopo thru) which contains all transactions for that ticker
    //     fetchedInvestmentEntries[element].forEach((element2,index)=>{
    //         return console.log('entry for each ticker:',element2)
    //     })
    // })


    const stockCards = tickerAndPrice.map((stock,index)=>{
        return (
        <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate('About')}>
                <View style={styles.infoWrapper}>
                    <View style={styles.tickernamewrapper}>
                        <Text style={styles.ticker}>{stock.ticker}</Text>
                        {/* <Text style={styles.name}>{stock.name}</Text> */}
                    </View>
                    <View>
                         <Text>{stock.value}</Text>
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
  