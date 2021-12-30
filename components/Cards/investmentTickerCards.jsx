import { InfoIcon } from 'native-base';
import React, { useEffect, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';


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
    },[])

    const fetchInvestments = () => {
        const userid = user
        fetch(`https://roundup-api.herokuapp.com/data/investment/user/${userid}`)
        .then(data=>data.json())
        .then((parsedData)=>{
        console.log('parseddata:',parsedData)
        const stockList = parsedData.map((stock)=>{
            return (
                {
                    'name': stock.investmentsentry.ticker,
                    'category':stock.investmentsentry.category
                }
            )
        })
        setFetchedInvestmentEntries(stockList)
        // extracting unique list of stocks/crypto
        const uniqueList = parsedData.map(stock=>stock.investmentsentry.ticker)
        setDistinctStockList([...new Set(uniqueList)].sort())
       })
        .catch((err)=>console.log(err))
        }

    // WIP
    // try to see if you can query distinct data based on ticker so you don't have to handle on frontend side  
    const getStockPrices = () => {
        // for ticker in distinctstocklist, run it thru fetchedinvestmententries to check for category (stock/crypto), fetch the current price and push as object into distinct stock list to be rerendered in cards. 
    const updateCategoryOfStock = distinctStockList.map((stock)=>{
    fetchedInvestmentEntries.
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

    console.log('fetchedinvestmententries:',fetchedInvestmentEntries)
    console.log('distinctstocklist:',distinctStockList)

    const stockCards = distinctStockList.map((stock,index)=>{
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
  