import * as React from "react";
import { NativeBaseProvider, View, Box, Button, Center, VStack, Text } from "native-base";
import { Dimensions, ScrollView } from "react-native";
import Carousel from "pinar";
import InvestmentLineChartComponentDaily from "../../Charts/investmentLineChartDaily";
import PieChartComponent from "../../Charts/investmentPieChart";
import InvestmentTickerCards from "../../Cards/investmentTickerCards";
import DataContext from "../../../context/DataContext";
import { AntDesign } from "@expo/vector-icons";

export default function GeneralBreakdownPage({navigation}) {
  // filter state
  const [ isFilteredByCrypto, setIsFilteredByCrypto ] = React.useState(true)
  const [ isFilteredByStocks, setIsFilteredByStocks ] = React.useState(true)

  const { userRoleContext } = React.useContext(DataContext);
  const [userRole, setUserRole] = userRoleContext;

  const screenHeight = Dimensions.get("screen").height;
  const carouselHeight = screenHeight * 0.34;

  const styles = {
    dotStyle: {
      backgroundColor: "#F5E0EE",
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
    activeDotStyle: {
      backgroundColor: "#F49BD6",
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
  };

  return (
    <NativeBaseProvider>
        {userRole==="BASIC"?
        // show if BASIC user
        <Box bgColor="#fff" height="100%" justifyContent={"center"}>
          <VStack
            space={3}
            alignItems="center"
            justifyContent="center"
            pl={5}
            pr={3}
          >
            <AntDesign name="lock" size={24} color="black" />
            <Button variant="outline" colorScheme="dark" onPress={()=>navigation.navigate("Profile")}>
            <Text fontSize="sm" color="coolGray.800">
              Unlock Premium
            </Text>
            </Button>
          </VStack>
        </Box>
        :
        // show if PREMIUM user
      <Box bgColor="#fff" height="100%">
        <Carousel
          height={carouselHeight}
          showsControls={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          <View pl={2.5}>
            <PieChartComponent />
          </View>
          <View>
            <InvestmentLineChartComponentDaily />
          </View>
        </Carousel>
        <Box height="10%" px={6}>
          <Center>
            <Button.Group>
              <Button
                variant={isFilteredByStocks?"outline":"subtle"}
                _text={{color:isFilteredByStocks?"coolGray.500":"coolGray.300"}}
                colorScheme="light"
                onPress={() => setIsFilteredByStocks(!isFilteredByStocks)}
              >
                Stocks
              </Button>
              <Button
                variant={isFilteredByCrypto?"outline":"subtle"}
                _text={{color:isFilteredByCrypto?"coolGray.500":"coolGray.300"}}
                colorScheme="light"
                onPress={() => setIsFilteredByCrypto(!isFilteredByCrypto)}
              >
                Crypto
              </Button>
              <Button
                variant="outline"
                colorScheme="light"
                onPress={() => navigation.navigate("Entry Investment Page")}
              >
                Add Investment
              </Button>
            </Button.Group>
          </Center>
        </Box>
        <Box height="45%" px={6}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <InvestmentTickerCards isFilteredByCrypto={isFilteredByCrypto} isFilteredByStocks={isFilteredByStocks}/>
          </ScrollView>
        </Box>
      </Box>}
    </NativeBaseProvider>
  );
}
