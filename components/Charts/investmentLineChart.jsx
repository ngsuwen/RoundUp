import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { Alert, Box, VStack, Text, Center, Button } from "native-base";
import { LineChart } from "react-native-chart-kit";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DataContext from "../../context/DataContext";

export default function cashLineChartComponent({dataMonth, investmentYearlyData, monthArr, todayDate}) {

  const { userRoleContext } = React.useContext(DataContext);
  const [userRole, setUserRole] = userRoleContext;

  let count = 0;

  for(let i=0; i<12; i++){ 
    count += Number(investmentYearlyData[i]); 
  }

  const linedata = {
    labels: count==0?['No Data Available']:dataMonth,
    datasets: [
      {
        data: count==0?[0]:investmentYearlyData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [
      `INVESTMENT, ${monthArr[todayDate.getMonth() + 1]} ${
        todayDate.getFullYear() - 1
      } - ${monthArr[todayDate.getMonth()]} ${todayDate.getFullYear()}`,
    ], // optional
  };

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
  const navigation = useNavigation();


  // set comma for y-axis values over 1000
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <Center
        flex={1}
        height={"100%"}
        width={"100%"}
        style={{ position: "absolute", zIndex: userRole==="BASIC"?10:-10 }}
        bg="white:alpha.80"
      >
        {userRole==="BASIC"?
        <VStack space={3} alignItems="center" justifyContent="center">
          <AntDesign name="lock" size={24} color="black" />
          <Text fontSize="md" fontWeight="bold" color="coolGray.800">
            Content Locked!
          </Text>
          <Button
            variant="outline"
            colorScheme="dark"
            onPress={() => navigation.navigate("Profile")}
          >
            <Text fontSize="sm" color="coolGray.800">
              Unlock Premium
            </Text>
          </Button>
        </VStack>
        :''}
      </Center>
      <LineChart
        data={linedata}
        width={screenWidth *0.95}
        height={screenHeight * 0.25}
        chartConfig={chartConfig}
        bezier
        fromZero={true}
        formatYLabel={(data)=>numberWithCommas(Math.round(data))}
      />
    </>
  );
}
