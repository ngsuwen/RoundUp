import { InfoIcon } from 'native-base';
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

const { investmentContext, stockListDistinctContext, userContext } = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [distinctStockList,setDistinctStockList] = stockListDistinctContext
const [user, setUser] = userContext


    useEffect(()=>{
        fetchInvestments()
        fetchCurrentStockPrice(tickerList)
    },[])

    const fetchInvestments = () => {
        const userid = user
        fetch(`https://roundup-api.herokuapp.com/data/investment/user/${userid}`)
        .then(data=>data.json())
        .then((parsedData)=>{
        // array of object

        // grouping fetched data by ticker symbol 
        const entriesByTicker = _(parsedData).groupBy((element)=>{
            const groupedTicker = element.investmentsentry.ticker
            return groupedTicker
        })
        // object of tickers who contains array of obj of entries
        // console.log('entriesByTicker:',entriesByTicker)
        setFetchedInvestmentEntries(entriesByTicker)
        console.log('fetchedinvestmententries:',fetchedInvestmentEntries)
        // const tickerList = Object.keys(entriesByTicker).sort()

 
       })
        .catch((err)=>console.log(err))
        }

    const fetchCurrentStockPrice = (tickerList) => {
        tickerList.forEach((ticker,index)=>{
            // need to check category before fetching current price
            console.log('category:',fetchedInvestmentEntries[ticker][0]['investmentsentry']['category'])
        })
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

    const tickerList = Object.keys(fetchedInvestmentEntries).sort()
    const stockCards = tickerList.map((stock,index)=>{
        return (
        <View style={styles.wrapper}>
            <Pressable onPress={() => navigation.navigate('About')}>
                <View style={styles.infoWrapper}>
                    <View style={styles.tickernamewrapper}>
                        <Text style={styles.ticker}>{stock}</Text>
                        {/* <Text style={styles.name}>{stock.name}</Text> */}
                    </View>
                    <View>
                         <Text>$stock price</Text>
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
  