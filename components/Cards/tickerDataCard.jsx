import React from "react";
import { useState, useEffect, useContext } from "react";
import DataContext from "../../context/DataContext";
import {
  Text,
  Box,
  Image,
  SafeAreaBox,
  Dimensions,
  Button,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const _ = require("underscore");

export default function tickerDataCard() {
  const { investmentContext,userContext,investmentTickerContext,tickerAndPriceContext,selectedTickerAndPriceContext,investmentAccordionForceRenderContext} = useContext(DataContext);
  const [fetchedInvestmentEntries, setFetchedInvestmentEntries] = investmentContext;
  const [tickerAndPrice, setTickerAndPrice] = tickerAndPriceContext;
  const [selectedTickerAndPrice, setSelectedTickerAndPrice] = selectedTickerAndPriceContext;
  const [tickerData, setTickerData] = investmentTickerContext;
  const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext;
  const [user, setUser] = userContext;

  const RenderTickerCardData = () => {
    // array of objects containing transaction data
    const transactionHistory =
      fetchedInvestmentEntries[selectedTickerAndPrice.ticker];
    const entriesByDay = _(transactionHistory).groupBy((element) => {
      const groupedDate = element.investmentsentry.date;
      const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format(
        "YYYY-MM-DD"
      );
      return formattedGroupedDate;
    });

    // sorting the dates by lastest first (at the top)
    const allDates = Object.keys(entriesByDay).sort();

    // avg price per stock, needed to find new totalAmountPaid
    // cost basis for one BUY transaction can be derived by price bought * qty
    // to get a moving cost basis, we need to get the average of all costBasis up to that buy transaction

    let costBasis = 0;

    // for every SELL txn, we need minus costBasis * qty sold off from total amount paid to find total amount paid for remaining qty of shares
    let totalAmountPaid = 0;

    let currentStockQty = 0;

    ///// TO FIND UNREALIZED P/L /////

    // HANDLING SELL/BUY TXN
    // for every SELL txn:
    // 1) get new totalAmountPaid [totalAmountPaid -= qtysold * current costBasis till that transaction]
    // 2) update total qty of stocks left [currentStockQty -= qtysold]
    // cost basis does not change when you sell because ratio of totalAmountPaid being minus/totalqty decreased will be a constant

    // for every BUY txn:
    // 1) update totalAmountPaid [totalAmountPaid += buy in price * qty bought]
    // 2) update total qty of stocks left [currentStockQty += qtybought]
    // 3) update cost basis [totalAmountPaid/currentStockQty]

    // Finally to get unrealized P/L,
    // loop through the whole list in chronological order and then use the formula as follows:
    // unrealizedPL = currentStockQty*currentprice - totalAmountPaid

    const stockDataCalculationFunction = allDates.map((date, index) => {
      entriesByDay[date].forEach((entry, index) => {
        // will have to use loop instead of (for txn of arr) in order to access the index. index is needed to single out the first buy in price to not get the average of the first buy in price. index 1 onwards will have to be divided by 2, but not index 0.
        // console.log('entriesbydateTICKERPAGE:',entriesByDay)
        if (entry.investmentsentry.transaction === "Buy") {
          totalAmountPaid +=
            entry.investmentsentry.price * entry.investmentsentry.quantity;
          currentStockQty += entry.investmentsentry.quantity;
          // console.log('ticker:',entry.investmentsentry.ticker)
          // console.log('BUYtotalamtpaid:',totalAmountPaid)

          // update cost basis after totalAmountPaid and currentStockQty is updated
          if (index === 0) {
            costBasis = entry.investmentsentry.price;
          } else {
            costBasis = totalAmountPaid / currentStockQty; // this statement is not true for the first transaction
          }
        }
        if (entry.investmentsentry.transaction === "Sell") {
          totalAmountPaid -= entry.investmentsentry.quantity * costBasis;
          currentStockQty -= entry.investmentsentry.quantity;
          // console.log('ticker:',entry.investmentsentry.ticker)
          // console.log('SELLtotalamtpaid:',totalAmountPaid)
        }
      });
    });

    // assuming current price is $20 (from API)
    let unrealizedPL =
      currentStockQty * selectedTickerAndPrice.value - totalAmountPaid;

    // console.log('costBasis:',costBasis)
    // console.log('totalAmountPaid:',totalAmountPaid)
    // console.log('currentstockqty:',currentStockQty)
    // console.log('unrealized P/L:',unrealizedPL)

    // linking to cash page
    // for all sell transactions, to add into cash balance
    // for all buy transactions, to deduct from cash balance

    // const monthOfExpense = moment(investmentMonth, moment.ISO_8601).format('YYYY-MM')

    // do this last when you have all info
    // similar to the investmenttickercards, if you save as state, it will only rerender the 2nd cycle, so on first render at tickerDataCard it will be empty unless forcedtorerender again.

    setTickerData({
      ticker: selectedTickerAndPrice.ticker,
      currentPrice: selectedTickerAndPrice.value,
      costBasis: costBasis,
      currentStockQty: currentStockQty,
      totalAmountPaid: totalAmountPaid,
      unrealizedPL: unrealizedPL.toFixed(2),
    });

    // console.log('tickerData:',tickerData) // will input array [] for first render but state is already set, just not refreshed for console.log
  };

  const navigation = useNavigation();

  useEffect(() => {
    const resetPage = navigation.addListener("focus", () => {
      RenderTickerCardData();
      // console.log('tickercard data rendered')
    });
    return resetPage;
  }, [fetchedInvestmentEntries]);

  return (
    <Box height="40%" justifyContent="center" mx={25}>
      <Box borderColor="coolGray.300" borderWidth={1} mx={2} mb={1} borderRadius={10} p={5}>
        <Text fontWeight="bold" textTransform={"uppercase"} pb={2}>{tickerData.ticker}</Text>
        <Text>Current Price: ${tickerData.currentPrice}</Text>
        <Text>Cost Basis: ${tickerData.costBasis}</Text>
        <Text>Quantity: {tickerData.currentStockQty} units</Text>
        <Text>Total Amount Paid: ${tickerData.totalAmountPaid}</Text>
        <Text>Unrealized P/L: ${tickerData.unrealizedPL}</Text>
      </Box>
    </Box>
  );
}
