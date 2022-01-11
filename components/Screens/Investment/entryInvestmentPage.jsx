import React, { useState, useEffect, useMemo} from 'react';
import {useContext} from "react"
import DataContext from '../../../context/DataContext';
import { StyleSheet, Pressable, Text, TextInput,View, Picker, SafeAreaView, Dimensions, ScrollView } from 'react-native';
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
  useTypeahead,
  Typeahead,
  Icon,
  IconButton,
  Center,
  Box,
  Container,
  Modal, 
  Button
  
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

  // Date Picker
  // const onChangeDate = (event, selectedDate) => {
  //   const currentDate = selectedDate || new Date(dateInvestment);
  //   setDateInvestment(currentDate);
    
  // };

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

            {/* date old
            <View style={styles.wrapper} >
                <DatePicker
                  style={styles.datepicker}
                  value={new Date(dateInvestment)}
                  onChange={onChangeDate}
                  />
                  
                  </View> */}

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
                    />
                  </Container>

                 {/* price old
                <View style={styles.wrapper} >
                  <TextInput
                
                      style={styles.textinput}
                      type="submit" 
                      name="price"
                      placeholder="Enter Price"
                      value={priceInvestment.toString()}
                      onChangeText={(text) => setPriceInvestment(text)}
                        />   
                        <Button
                          title="Clear"
                          onPress={()=>setPriceInvestment([])}
                          />
                    </View> */}


                     {/* quantity */}
                  <Container width="90%" px="4" bgColor="#fff">
                    <Text fontSize="sm" fontWeight="bold">
                      Price
                    </Text>
                    <Input
                      width="100%"
                      fontSize="sm"
                      mt="1"
                      color="coolGray.600"
                      placeholder="Enter Quantity"
                      value={qtyInvestment.toString()}
                      onChangeText={(text) => setQtyInvestment(text)}
                    />
                  </Container>

                  {/* quantity old
                  <View style={styles.wrapper} >
                      <TextInput
                          style={styles.textinput}
                          type="submit" 
                          name="quantity"
                          placeholder="Enter Quantity"
                          value={qtyInvestment.toString()}
                          onChangeText={(text) => setQtyInvestment(text)}
                            />   
                            <Button
                              title="Clear"
                              onPress={()=>setQtyInvestment([])}
                              />
                    </View> */}


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


                     {/* Transaction old
                     <View style={styles.wrapper}>

                            <Pressable 
                              style={styles.pressable}
                              onPress={()=> changeModalVisibilityTransaction(true)}
                              >
                              <Text style={styles.catText}>{transaction}</Text>

                            </Pressable>
                            <Modal
                              transparent={true}
                              animationType='fade'
                              visible={isModalVisibleTransaction}
                              onRequestClose={()=> changeModalVisibilityTransaction(false)}

                            >
                              <ModalTransactionPicker 
                                changeModalVisibilityTransaction={changeModalVisibilityTransaction}
                                setDataTransaction={setDataTransaction}
                              />
                              
                            </Modal>

                            </View> */}
        
              
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



                        {/* category old
                        <View style={styles.wrapper}>

                        <Pressable 
                            style={styles.pressable}
                            onPress={()=> changeModalVisibilityCat(true)}
                            >
                            <Text style={styles.catText}>{categoryInvestment}</Text>

                        </Pressable>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleCat}
                            onRequestClose={()=> changeModalVisibilityCat(false)}

                        >
                            <ModalCatPicker 
                              changeModalVisibilityCat={changeModalVisibilityCat}
                              setDataCat={setDataCat}
                            />
                            
                        </Modal>
                      
                        </View> */}


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


                {/* old button
                  <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit} />
                    <Button
                      title="Back"
                      onPress={() => navigation.navigate("Home")}
                    />
                </View> */}
                
          
                  
               
  
        </Center>
         </KeyboardAvoidingView>
     </NativeBaseProvider>
            
        
    )
}

export default EntryInvestmentPage;

// const screenWidth = Dimensions.get('screen').width
// const screenHeight = Dimensions.get('screen').height

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         flexDirection:'column',
//         backgroundColor: '#e6e2d3',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//         // marginTop: 100
        
//     },  
//     datepicker:{
//       paddingVertical: 100,
//       paddingHorizontal: 10,
//       width: "100%",
           
//       // borderColor: "gray",
//       // borderWidth: 1,
//       right: 100,
      
//     },
//     textinput:{
//       paddingVertical: 1,
//       paddingHorizontal: 1,
//       marginTop: 10,
//       marginBottom: 10,
//       fontSize: 20
      
//       // borderColor: "gray",
//       // borderWidth: 1,
//     },
//     picker:{
//       justifyContent: "center",
//       // left: 60,
//     },
//     button:{
//       flexDirection: "row",
//       alignSelf: "center"
//     },
//     inner: {
//       padding: 20,
//       flex: 1,
//       // justifyContent: "flex-end",
//     },
//     catText: {
//       marginVertical: 10,
//       fontSize: 22,
//       textAlign: "center"
//     },
//     pressable:{
//       backgroundColor: "#80ced6",
//       alignSelf: "stretch",
//       paddingHorizontal: 10,
//       marginHorizontal: 10,
//       borderRadius: 15
    
//     },
//     wrapper: {
//       fontSize: 20,
//       flex: 0.15,
//       textAlign: "center",
//       flexDirection:'column',
//       width: screenWidth*0.86,
//       backgroundColor: '#d5f4e6',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: 20,
//       paddingTop: 1,
//       margin: '1%',
//       shadowColor: "#000",
//       shadowOffset: {
//       width: 2,
//       height: 1,
//       },
//       shadowOpacity: 0.22,
//       shadowRadius: .22,
//       elevation: 3,
//       },




//       MainContainer: {
//         backgroundColor: '#FAFAFA',
//         flex: 1,
//         padding: 12,
//       },
//       AutocompleteStyle: {
//         flex: 1,
//         left: 0,
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         zIndex: 1,
//        borderWidth:1
//       },
//       SearchBoxTextItem: {
//         margin: 5,
//         fontSize: 16,
//         paddingTop: 4,
//       },
//       selectedTextContainer: {
//         flex: 1,
//         justifyContent: 'center',
//       },
//       selectedTextStyle: {
//         textAlign: 'center',
//         fontSize: 18,
//       },
     
 
// })


