import React, { useEffect, useContext } from 'react';
import DataContext from '../../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { Text, Box, Pressable, HStack, Divider, Center } from 'native-base';
const _ = require('underscore')

export default function investmentTickerCard() {

const navigation = useNavigation()

const { investmentContext, userContext, tickerAndPriceContext,investmentGPContext,investmentContextRawData, investmentAccordionForceRenderContext, investmentTickerContext,selectedTickerAndPriceContext} = useContext(DataContext)
const [fetchedInvestmentEntries,setFetchedInvestmentEntries] = investmentContext
const [fetchedInvestmentEntriesRawData,setFetchedInvestmentEntriesRawData] = investmentContextRawData
const [tickerAndPrice,setTickerAndPrice] = tickerAndPriceContext
const [selectedTickerAndPrice,setSelectedTickerAndPrice] = selectedTickerAndPriceContext
const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext
const [user, setUser] = userContext


    useEffect(()=>{
    // const resetPage = navigation.addListener("focus", ()=>{
        fetchInvestments()
        console.log('fetchinvestments rendered')
        return // unmounting so when page is focused on investmenttickercards page it refreshes and refetch data... else it wont refresh as component is already mounted and useEffect will not work.
        // })
        // return resetPage
    },[investmentAccordionForceRender])

    const fetchInvestments = async () => {
        const userid = user
        const fetchData = await fetch(`https://roundup-api.herokuapp.com/data/investment/user/${userid}`)
        const parsedData = await fetchData.json()
        setFetchedInvestmentEntriesRawData(parsedData)
        // grouping fetched data by ticker symbol 
        const entriesByTicker = _(parsedData).groupBy((element)=>{
            const groupedTicker = element.investmentsentry.ticker
            return groupedTicker
        })
        // console.log('entriesByTicker:',entriesByTicker)
        setFetchedInvestmentEntries(entriesByTicker) // ran but state will only update the next render... so fetchStockPrice() should not depend on state but rather a separate array that cna be passed into the function so you dont have to wait for the next render
        fetchStockPrice(entriesByTicker)
       }


    const fetchStockPrice = async (entriesByTicker) => { 

    const allTickerList = Object.keys(entriesByTicker).sort()
    // console.log('tickerlist:',tickerList) // ran but empty array as fetchedInvestmentEntries state is only updated the next render, hence tickerandpricestate will still be empty. Solved by passing entriesByTicker as variable instead.

    // need to filter out stocks/crypto with 0 qty so we don't track prices for those 
    
    let tickerList = []
    allTickerList.forEach((ticker)=>{
        let currentStockQty = 0
        entriesByTicker[ticker].map((entry)=>{
            if(entry.investmentsentry.transaction==='Buy'){
                currentStockQty+=entry.investmentsentry.quantity
             }
             if(entry.investmentsentry.transaction==='Sell'){
                currentStockQty-=entry.investmentsentry.quantity
              }   
        })
        // console.log(`ticker:${ticker},qty:${currentStockQty}`)
        if (currentStockQty > 0){
            tickerList.push(ticker)
        }
    })

    // console.log('tickerlist:',tickerList)

    const tickerAndPriceArr = [] 

    for (let ticker of tickerList){

        // function to input commas for thousands
        const numberWithCommas = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const priceFetcher = async () => {
            if(entriesByTicker[ticker][0]['investmentsentry']['category']==='US stocks'){
                const stockprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/stocks/${ticker}/current`)
                const parsedStockPriceObj = await stockprice.json()
                if(parsedStockPriceObj['value']>=1){
                    parsedStockPriceObj['prettifiedValue'] = numberWithCommas((Number.parseFloat(parsedStockPriceObj['value']).toFixed(2)))} // 2 d.p
                if(parsedStockPriceObj['value']<1){
                    parsedStockPriceObj['prettifiedValue'] = (Number.parseFloat(parsedStockPriceObj['value']).toPrecision(6)) // 6 s.f
                }
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
                const cryptoprice = await fetch(`https://roundup-api.herokuapp.com/data/investment/crypto/${ticker}/current`)
                const parsedCryptoPriceObj = await cryptoprice.json()
                if(parsedCryptoPriceObj['value']>=1){
                    parsedCryptoPriceObj['prettifiedValue'] = numberWithCommas((Number.parseFloat(parsedCryptoPriceObj['value']).toFixed(2)))} // 2 d.p
                if(parsedCryptoPriceObj['value']<1){
                    parsedCryptoPriceObj['prettifiedValue'] = (Number.parseFloat(parsedCryptoPriceObj['value']).toPrecision(6)) // 6 s.f
                }
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
        // console.log('fetchedprice:',fetchedPrice)
        tickerAndPriceArr.push(fetchedPrice)
       
        }

    setTickerAndPrice(tickerAndPriceArr)
    }

    const stockCards = tickerAndPrice.map((stock,index)=>{
        return (
        <Box key={index}>
            <Pressable 
                onPress={() => {
                setSelectedTickerAndPrice(stock)
                navigation.navigate('Transactions')}}
            >
                <HStack justifyContent="space-between" py="4" mx="7">
                    <Box>
                        <Text fontWeight="bold">{stock.ticker.toUpperCase()}</Text>
                        {/* <Text>{stock.name}</Text> */}
                    </Box>
                    <Box>
                         <Text >$ {stock.prettifiedValue}</Text>
                    </Box>
                </HStack>
            </Pressable>
            {index!=tickerAndPrice.length-1?<Divider/>:<Box/>}
        </Box>
        )
    })
    
    return (
    tickerAndPrice.length>0?
    <Box borderWidth={1} borderColor="coolGray.300" borderRadius={15}>
      {stockCards}
    </Box>
    :<Center><Text>No entries yet</Text></Center>
    )
  }
  