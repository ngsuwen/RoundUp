import * as React from "react";
import DataContext from "../../../context/DataContext";
import { StyleSheet, TextInput, SafeAreaView, Dimensions } from "react-native";
// import DatePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-neat-date-picker";
import { ModalCatPicker } from "./modalInvestCatPicker";
import { ModalTransactionPicker } from "./modalInvestTransactionPicker";
import {
  NativeBaseProvider,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
  Container,
  Modal,
  Button,
  Input,
  useTypeahead,
  Typeahead,
  Icon,
  IconButton,
  Center,
  Box,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native";

const EditInvestmentPage = ({ navigation, route }) => {
  const { entry } = route.params;

  // useContext
  const { userContext, investmentEntryContext, expenseForceRenderContext,investmentAccordionForceRenderContext } =
    React.useContext(DataContext);
  const [userId, setUserId] = userContext;
  const [investmentAccordionForceRender,setInvestmentAccordionForceRender] = investmentAccordionForceRenderContext

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

  const [inputCryptoItems, setInputCryptoItems] = React.useState(['btc','eth','luna']);
  const [inputStockItems, setInputStockItems] = React.useState(['tsla','googl','sq']);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState();

  React.useEffect(() => {
    setInputValue(categoryInvestment === "Crypto"?filterTextCrypto:filterTextStock);
  }, [expenseForceRender, filterTextStock, filterTextCrypto]);

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
  const [isPriceValid, setIsPriceValid] = React.useState(true);
  const [isQtyValid, setIsQtyValid] = React.useState(true);

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
  const [show, setShow] = React.useState(false);

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
    setIsOpen(false);
    setShow(true);
  };

  const formattedDate = moment(dateInvestment, moment.ISO_8601).format(
    "YYYY-MM-DD"
  );

  // Modal for category
  const [isModalVisibleCat, setIsModalVisibleCat] = React.useState(false);

  const changeModalVisibilityCat = (bool) => {
    setIsOpen(false);
    setIsModalVisibleCat(bool);
  };

  const setDataCat = (option) => {
    setCategoryInvestment(option);
  };

  // Modal for transaction
  const [isModalVisibleTransaction, setIsModalVisibleTransaction] =
    React.useState(false);

  const changeModalVisibilityTransaction = (bool) => {
    setIsOpen(false);
    setIsModalVisibleTransaction(bool);
  };

  const setDataTransaction = (option) => {
    setTransaction(option);
  };

  // clear states onload at entryinvestment page
  React.useEffect(() => {
    const resetPage = navigation.addListener("focus", () => {
      setIsPriceValid(true);
      setIsQtyValid(true);
    });
    return resetPage;
  }, [expenseForceRender]);

  const handleSubmit = async (investment) => {
    try {
      // event.preventDefault();
      const res = await fetch(
        `https://roundup-api.herokuapp.com/data/investment/${investment._id}/edit`,
        {
          method: "PUT",
          body: JSON.stringify({
            username: userId,
            investmentsentry: {
              date: dateInvestment,
              price: priceInvestment,
              category: categoryInvestment,
              ticker: inputValue,
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
        console.error("edit data investment failed");
        // validation
        if (isPriceValid === false || isQtyValid === false) {
          alert("One of the fields is invalid. Create failed!");
          return navigation.navigate("Edit Investment Page", { entry: entry });
        }
        
      }
      // no field validation error not working
      // if (priceInvestment.length < 1 || qtyInvestment.length < 1) {
      //   alert("One of the fields is empty. Create failed!");
      //   return navigation.navigate("Edit Investment Page", { entry: entry });
      // }
     

      const data = await res.json();

      setInvestmentAccordionForceRender(!investmentAccordionForceRender)

      // pass the data into params entry so that showpage will show latest updated data

      navigation.navigate("Show Investment Page", { entry: data });
    } catch (err) {
      console.log(err);
    }
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
                  {categoryInvestment === "Crypto"
                    ? inputCryptoItems.map((item, index) => (
                        <Button
                          key={`${item}${index}`}
                          bgColor="muted.50"
                          justifyContent="flex-start"
                          onPress={()=>buttonHandler(item)}
                        >
                          <Text fontSize="sm">{item}</Text>
                        </Button>
                      ))
                    : inputStockItems.map((item, index) => (
                        <Button
                          key={`${item}${index}`}
                          bgColor="muted.50"
                          justifyContent="flex-start"
                          onPress={()=>buttonHandler(item)}
                        >
                          <Text fontSize="sm">{item}</Text>
                        </Button>
                      ))}
                </ScrollView>
              </Box>
            )}
          </Container>

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
          <Container width="90%" px="4" pt="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Price
            </Text>
            <Input
              width="100%"
              fontSize="sm"
              mt="1"
              color="coolGray.600"
              value={priceInvestment.toString()}
              onFocus={()=>setIsOpen(false)}
              onChangeText={(text) => setPriceInvestment(text)}
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
              onFocus={()=>setIsOpen(false)}
              value={qtyInvestment.toString()}
              onChangeText={(text) => setQtyInvestment(text)}
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

          <Button.Group size="sm" mt="5">
            <Button
              variant="outline"
              bgColor="white"
              colorScheme="light"
              onPress={() =>
                navigation.navigate("Show Investment Page", { entry: entry })
              }
            >
              <Text>Cancel</Text>
            </Button>
            <Button
              colorScheme="primary"
              onPress={() => {
                handleSubmit(entry);
              }}
            >
              <Text>Update</Text>
            </Button>
          </Button.Group>
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default EditInvestmentPage;
