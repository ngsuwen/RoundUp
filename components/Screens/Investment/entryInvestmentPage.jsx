import React, { useState, useEffect, useMemo} from 'react';
import {useContext} from "react"
import DataContext from '../../../context/DataContext';
import DatePicker from "react-native-neat-date-picker";
// import DatePicker from "@react-native-community/datetimepicker"
import { ModalCatPicker} from "./modalInvestCatPicker"
import {ModalTransactionPicker} from "./modalInvestTransactionPicker"
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

import {
  NativeBaseProvider,
  KeyboardAvoidingView,
  Input,
  Typeahead,
  Icon,
  Center,
  Box,
  Container,
  Modal, 
  Button,
  Pressable,
  Text,
  View,
  Divider
  
} from "native-base";


const EntryInvestmentPage = ({navigation}) => {

  
   // useContext
   const { userContext, investmentEntryContext, expenseForceRenderContext } = useContext(DataContext)
   const [userId, setUserId]=userContext
   const [dateInvestment,setDateInvestment,
          priceInvestment,setPriceInvestment,
          categoryInvestment,setCategoryInvestment,
          tickerInvestment,setTickerInvestment, 
          qtyInvestment, setQtyInvestment,
          transaction, setTransaction,
          coin, setCoin,
          stock, setStock,
          filterTextCrypto, setFilterTextCrypto,
          filterTextStock, setFilterTextStock,
          filteredItemsCrypto,filteredItemsStock,
         ] = investmentEntryContext

   const [expenseForceRender,setExpenseForceRender] = expenseForceRenderContext

   // validation
   const [isPriceValid, setIsPriceValid] = useState(true)
   const [isQtyValid, setIsQtyValid] = useState(true)

   const validateNum = (price) =>{
    const  re = /^[0-9]*$/
    
    // const result = re.test(price)
    // console.log("result", result)
    return re.test(String(price).toLowerCase())
  
  }

  const onPriceBlur = (bool) =>{
    const isPriceValid = validateNum(bool)
    setIsPriceValid(isPriceValid) //set as true or false

  }
 
  const onQtyBlur = (bool) =>{
    const isQtyValid = validateNum(bool)
    setIsQtyValid(isQtyValid) //set as true or false

  }
   
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
    setShow(true);
  };

  const formattedDate = moment(dateInvestment, moment.ISO_8601).format("YYYY-MM-DD");


  // Modal for category
  const [isModalVisibleCat, setIsModalVisibleCat] = useState(false)

  const changeModalVisibilityCat = (bool) =>{
  setIsModalVisibleCat(bool)
  }

  const setDataCat = (option) =>{
    setCategoryInvestment(option)
  }


  // Modal for transaction
  const [isModalVisibleTransaction, setIsModalVisibleTransaction] = useState(false)

  const changeModalVisibilityTransaction = (bool) =>{
  setIsModalVisibleTransaction(bool)
  }

  const setDataTransaction = (option) =>{
    setTransaction(option)
  }

   
  // clear states onload at entryinvestment page
  useEffect(()=>{
    const resetPage = navigation.addListener("focus", ()=>{
      setDateInvestment(new Date())
      setPriceInvestment([])
      setCategoryInvestment("Crypto")
      setQtyInvestment([])
      setTransaction("Select Buy or Sell...")
      setFilterTextCrypto("")
      setFilterTextStock("")
      setIsPriceValid(true)
      setIsQtyValid(true)
  
    })
     return resetPage
  }, [expenseForceRender])


    const handleSubmit = async (event) => {
      try{
        
        event.preventDefault();
        const res = await fetch("https://roundup-api.herokuapp.com/data/investment", {
         
          method: "POST",
          body: JSON.stringify(
            { 
              username: userId,
              investmentsentry:
                { 
                  date: dateInvestment,
                  price: priceInvestment,
                  category: categoryInvestment,
                  ticker: categoryInvestment === "Crypto" ? filterTextCrypto : filterTextStock,
                  quantity: qtyInvestment,
                  transaction: transaction  }   
            }
            ),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if(res.status!==200){
          console.error('create data investment failed')
        }
      setExpenseForceRender(!expenseForceRender)
      
      if (isPriceValid === false || isQtyValid === false){
        alert("One of the fields are invalid. Create failed!")
        return navigation.navigate("Entry Investment Page")
      }
     
      } catch(err){
        console.log(err)
      }
        
        navigation.navigate("Investment GP")
        
      }
    return (
      <NativeBaseProvider>
          <KeyboardAvoidingView

                h={{
                  base: "100%",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
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

            {/* date */}
            <Container width="90%" pt="0" p="4" bgColor="#fff">
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
        <Container width="90%" px="4" bgColor="#fff">
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
            onBlur={() =>onPriceBlur(priceInvestment)}
            
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
            onBlur={() =>onQtyBlur(qtyInvestment)}
          />
          {isQtyValid ? "" : <Text color="red.600">Invalid Quantity</Text>}
        </Container>


        {/* Transaction */}
        <Container width="90%" p="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Transaction
            </Text>
            <Pressable width="100%" onPress={() => changeModalVisibilityTransaction(true)}>
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
                    changeModalVisibilityTransaction={changeModalVisibilityTransaction}
                    setDataTransaction={setDataTransaction}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Container>


          {/* Category */}
          <Container width="90%" p="4" bgColor="#fff">
          <Text fontSize="sm" fontWeight="bold">
            Category
          </Text>
          <Pressable width="100%" onPress={() => changeModalVisibilityCat(true)}>
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
        { categoryInvestment === "Crypto" ?
          <Container width="90%" p="4" bgColor="#fff">
            <Typeahead
              inputValue={filterTextCrypto}
              options={filteredItemsCrypto}
              onChange={setFilterTextCrypto}
              onSelectedItemChange={(value) => console.log("Selected Item ", value)}
              getOptionKey={(item) => item.id}
              getOptionLabel={(item) => item.symbol}
              label="Select Crypto Ticker"
              toggleIcon={({ isOpen }) => {
                return isOpen ? (
                  <Icon name="arrow-drop-up" type="MaterialIcons" size={12} />
                ) : (
                  <Icon name="arrow-drop-down" type="MaterialIcons" size={12} />
                );
              }}
            />
          </Container>
                          :
          <Container width="90%" p="4" bgColor="#fff">
            <Typeahead
              inputValue={filterTextStock}
              options={filteredItemsStock}
              onChange={setFilterTextStock}
              onSelectedItemChange={(value) => console.log("Selected Item ", value)}
              getOptionKey={(item) => item.symbol} //the key must be available in api, else wont work
              getOptionLabel={(item) => item.displaySymbol}
              label="Select Stock Ticker"
              toggleIcon={({ isOpen }) => {
                return isOpen ? (
                  <Icon name="arrow-drop-up" type="MaterialIcons" size={12} />
                ) : (
                  <Icon name="arrow-drop-down" type="MaterialIcons" size={12} />
                );
              }}
            />
          </Container>
        }
                                         
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
            
        
    )
}

export default EntryInvestmentPage;