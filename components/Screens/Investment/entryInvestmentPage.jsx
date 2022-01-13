import React, { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import DatePicker from "react-native-neat-date-picker";
// import DatePicker from "@react-native-community/datetimepicker"
import { ModalCatPicker } from "./modalInvestCatPicker";
import { ModalTransactionPicker } from "./modalInvestTransactionPicker";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import moment from "moment";

import {
  NativeBaseProvider,
  KeyboardAvoidingView,
  Input,
  useTypeahead,
  Typeahead,
  Icon,
  IconButton,
  Center,
  Box,
  Container,
  Modal,
  Button,
  Pressable,
  Text,
  View,
  Divider,
} from "native-base";

const EntryInvestmentPage = ({ navigation }) => {
  // useContext
  const { userContext, investmentEntryContext, expenseForceRenderContext } =
    useContext(DataContext);
  const [userId, setUserId] = userContext;
  const [
    dateInvestment,
    setDateInvestment,
    priceInvestment,
    setPriceInvestment,
    categoryInvestment,
    setCategoryInvestment,
    tickerInvestment,
    setTickerInvestment,
    qtyInvestment,
    setQtyInvestment,
    transaction,
    setTransaction,
    coin,
    setCoin,
    stock,
    setStock,
    filterTextCrypto,
    setFilterTextCrypto,
    filterTextStock,
    setFilterTextStock,
    filteredItemsCrypto,
    filteredItemsStock,
  ] = investmentEntryContext;

  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;

  // autocomplete
  const autocompleteCryptoList = coin.map((item) => item.symbol);
  const autocompleteStockList = stock.map((item) => item.displaySymbol);

  const [inputCryptoItems, setInputCryptoItems] = useState(['btc','eth','luna']);
  const [inputStockItems, setInputStockItems] = useState(['tsla','googl','sq']);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState();

  const textChangeHandler = (text) => {
    categoryInvestment === "Crypto"
      ? setInputCryptoItems(
          autocompleteCryptoList.filter((item) =>
            item.toLowerCase().startsWith(text.toLowerCase())
          )
        )
      : setInputStockItems(
          autocompleteStockList.filter((item) =>
            item.toLowerCase().startsWith(text.toLowerCase())
          )
        );
    setInputValue(text);
    return;
  };

  const buttonHandler=(text)=>{
    setInputValue(text)
    setIsOpen(false)
    return
  }

  // validation
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isQtyValid, setIsQtyValid] = useState(true);

  const validateNum = (price) => {
    const re = /^[0-9]*$/;

    // const result = re.test(price)
    // console.log("result", result)
    return re.test(String(price).toLowerCase());
  };

  const onPriceBlur = (bool) => {
    const isPriceValid = validateNum(bool);
    setIsPriceValid(isPriceValid); //set as true or false
  };

  const onQtyBlur = (bool) => {
    const isQtyValid = validateNum(bool);
    setIsQtyValid(isQtyValid); //set as true or false
  };

  // show for datepicker
  const [show, setShow] = useState(false);

  // Date Picker
  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = (date) => {
    setShow(false);
    setDateInvestment(date);
  };

  // to show and hide date picker
  const showDatepicker = () => {
    setIsOpen(false)
    setShow(true);
  };

  const formattedDate = moment(dateInvestment, moment.ISO_8601).format(
    "YYYY-MM-DD"
  );

  // Modal for category
  const [isModalVisibleCat, setIsModalVisibleCat] = useState(false);

  const changeModalVisibilityCat = (bool) => {
    setIsOpen(false)
    setIsModalVisibleCat(bool);
  };

  const setDataCat = (option) => {
    setCategoryInvestment(option);
  };

  // Modal for transaction
  const [isModalVisibleTransaction, setIsModalVisibleTransaction] =
    useState(false);

  const changeModalVisibilityTransaction = (bool) => {
    setIsOpen(false)
    setIsModalVisibleTransaction(bool);
  };

  const setDataTransaction = (option) => {
    setTransaction(option);
  };

  // clear states onload at entryinvestment page
  useEffect(() => {
    const resetPage = navigation.addListener("focus", () => {
      setDateInvestment(new Date());
      setPriceInvestment([]);
      setCategoryInvestment("Crypto");
      setQtyInvestment([]);
      setTransaction("Select Buy or Sell...");
      setFilterTextCrypto("");
      setFilterTextStock("");
      setIsPriceValid(true);
      setIsQtyValid(true);
      setInputValue('')
      setIsOpen(false)
    });
    return resetPage;
  }, [expenseForceRender]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(
        "https://roundup-api.herokuapp.com/data/investment",
        {
          method: "POST",
          body: JSON.stringify({
            username: userId,
            investmentsentry: {
              date: dateInvestment,
              price: priceInvestment,
              category: categoryInvestment,
              ticker:
                categoryInvestment === "Crypto"
                  ? inputCryptoItems[0]
                  : inputStockItems[0],
              quantity: qtyInvestment,
              transaction: transaction,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        //console.error("create data investment failed");
        // validation
        if (isPriceValid === false || isQtyValid === false) {
          alert("One of the fields is invalid. Create failed!");
          return navigation.navigate("Entry Investment Page");
        }
      // no field validation error
      if (priceInvestment.length < 1 || qtyInvestment.length < 1) {
        alert("One of the fields is empty. Create failed!");
        return navigation.navigate("Entry Investment Page");
      }
      }
      setExpenseForceRender(!expenseForceRender);

     
    } catch (err) {
      console.log(err);
    }

    navigation.navigate("Investment GP");
  };
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center flex={1} bgColor="#fff">
          <View width="90%" paddingRight={5} alignItems="flex-end">
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          </View>

          {/* Category */}
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Category
            </Text>
            <Pressable
              width="100%"
              onPress={() => changeModalVisibilityCat(true)}
            >
              <Text
                fontSize="sm"
                mt="1"
                borderRadius="sm"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
              >
                {categoryInvestment}
              </Text>
            </Pressable>
            <Modal
              isOpen={isModalVisibleCat}
              defaultIsOpen="false"
              onClose={() => changeModalVisibilityCat(false)}
              size="sm"
            >
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header
                  _text={{
                    fontWeight: "bold",
                    fontSize: "sm",
                  }}
                >
                  Category
                </Modal.Header>
                <Modal.Body>
                  <ModalCatPicker
                    changeModalVisibilityCat={changeModalVisibilityCat}
                    setDataCat={setDataCat}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Container>

          {/* Autocomplete ticker */}
          <Container width="90%" p="4" bgColor="#fff">
            <Text fontSize="sm" pb={1} fontWeight="bold">
              {categoryInvestment === "Crypto"
                ? "Crypto Ticker"
                : "Stock Ticker"}
            </Text>
            <Box width="100%">
              <Input
                width="85%"
                fontSize="sm"
                mt="1"
                color="coolGray.600"
                placeholder="Enter Ticker"
                onFocus={()=>setIsOpen(true)}
                value={inputValue}
                onChangeText={(text)=>textChangeHandler(text)}
                w={{
                  base: "100%",
                  md: "25%",
                }}
                InputRightElement={
                  <IconButton
                    onPress={()=>setIsOpen(!isOpen)}
                    icon={
                      isOpen ? (
                        <MaterialIcons
                          name="arrow-drop-up"
                          size={24}
                          color="black"
                        />
                      ) : (
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={24}
                          color="black"
                        />
                      )
                    }
                  />
                }
              />
            </Box>
            {isOpen && (
              <Box
                width="100%"
                maxHeight="115"
                borderRadius="0"
                borderColor="coolGray.200"
                borderWidth="1"
                pb="2"
                bgColor="muted.50"
              >
                <ScrollView>
                  {categoryInvestment === "Crypto" ?
                  inputCryptoItems.map((item, index) => (
                    <Button
                      key={`${item}${index}`}
                      bgColor="muted.50"
                      justifyContent="flex-start"
                      onPress={()=>buttonHandler(item)}
                    >
                      <Text fontSize="sm">{item}</Text>
                    </Button>
                  )):
                  inputStockItems.map((item, index) => (
                    <Button
                      key={`${item}${index}`}
                      bgColor="muted.50"
                      justifyContent="flex-start"
                      onMouseDown={()=>buttonHandler(item)}
                    >
                      <Text fontSize="sm">{item}</Text>
                    </Button>
                  ))
                  }
                </ScrollView>
              </Box>
            )}
          </Container>

          {/* date */}
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Date
            </Text>
            <Pressable width="100%" onPress={showDatepicker}>
              <Text
                fontSize="sm"
                mt="1"
                borderRadius="sm"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
              >
                {formattedDate}
              </Text>
            </Pressable>
            <DatePicker
              isVisible={show}
              mode={"single"}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          </Container>

          {/* price */}
          <Container width="90%" pt="4" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Price
            </Text>
            <Input
              width="100%"
              fontSize="sm"
              mt="1"
              color="coolGray.600"
              placeholder="Enter Price"
              value={priceInvestment.toString()}
              onChangeText={(text) => setPriceInvestment(text)}
              onFocus={()=>setIsOpen(false)}
              onBlur={() => onPriceBlur(priceInvestment)}
            />
            {isPriceValid ? "" : <Text color="red.600">Invalid Price</Text>}
          </Container>

          {/* quantity */}
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Quantity
            </Text>
            <Input
              width="100%"
              fontSize="sm"
              mt="1"
              color="coolGray.600"
              placeholder="Enter Quantity"
              value={qtyInvestment.toString()}
              onChangeText={(text) => setQtyInvestment(text)}
              onFocus={()=>setIsOpen(false)}
              onBlur={() => onQtyBlur(qtyInvestment)}
            />
            {isQtyValid ? "" : <Text color="red.600">Invalid Quantity</Text>}
          </Container>

          {/* Transaction */}
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Transaction
            </Text>
            <Pressable
              width="100%"
              onPress={() => changeModalVisibilityTransaction(true)}
            >
              <Text
                fontSize="sm"
                mt="1"
                borderRadius="sm"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
              >
                {transaction}
              </Text>
            </Pressable>
            <Modal
              isOpen={isModalVisibleTransaction}
              defaultIsOpen="false"
              onClose={() => changeModalVisibilityTransaction(false)}
              size="sm"
            >
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header
                  _text={{
                    fontWeight: "bold",
                    fontSize: "sm",
                  }}
                >
                  Transaction
                </Modal.Header>
                <Modal.Body>
                  <ModalTransactionPicker
                    changeModalVisibilityTransaction={
                      changeModalVisibilityTransaction
                    }
                    setDataTransaction={setDataTransaction}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Container>

          <Button
            size="sm"
            variant="outline"
            bgColor="white"
            colorScheme="light"
            onPress={handleSubmit}
            mt="5"
          >
            <Text>Add Investment</Text>
          </Button>
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default EntryInvestmentPage;
