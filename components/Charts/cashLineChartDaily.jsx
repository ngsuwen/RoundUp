import React from "react";
import {
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState, useEffect, useContext } from "react";
import DataContext from "../../context/DataContext";
import moment from "moment";
const _ = require("underscore");

export default function cashLineChartComponent() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(163, 71, 165, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const { cashMonthContext, cashMonthGroupedByDate } =
    useContext(DataContext);
  const [fetchedCashEntries, setFetchedCashEntries] = cashMonthContext;
  const [allLabels, setAllLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([0]);

  useEffect(() => {
    reloadCash();
  }, [fetchedCashEntries]);

  const reloadCash = () => {
    // grouping logic
    const entriesByDay = _(fetchedCashEntries).groupBy((element) => {
      const groupedDate = element.cashentry.date;
      const formattedGroupedDate = moment(groupedDate, moment.ISO_8601).format(
        "DD"
      );
      return formattedGroupedDate;
    })

    const allDates = Object.keys(entriesByDay).sort((a, b) => a - b); // -> this is labels
    setAllLabels(allDates)

    const totalAmountArr = allDates.map((date) => {
      // method for calculating total amount for each day
      let totalAmount = 0;
      entriesByDay[date].forEach((entry) => {
        totalAmount += entry.cashentry.amount;
      });
      return totalAmount;
    });

    // this condition is required because if array is empty, react-chart-kit will return invalid number error
    if (totalAmountArr.length > 0) {
      setDataPoints(totalAmountArr);
    } else {
      setDataPoints([0]);
      setAllLabels(["No Data Available"]);
    }
  };

  const linedata = {
    labels: allLabels,
    datasets: [
      {
        data: dataPoints ? dataPoints : [0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [fetchedCashEntries[0]?moment(fetchedCashEntries[0].cashentry.date).format("MMM YYYY").toUpperCase():'']
  };

  // set comma for y-axis values over 1000
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <LineChart
      data={linedata}
      width={screenWidth *0.95}
      height={screenHeight * 0.25}
      chartConfig={chartConfig}
      bezier
      fromZero={true}
      style={{
        marginLeft: 20,
      }}
      formatYLabel={(data)=>numberWithCommas(Math.round(data))}
    />
  );
}
