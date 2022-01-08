import * as React from "react";
import DataContext from "../../../context/DataContext";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  SafeAreaView,
  Button,
  Pressable,
  Modal,
  Dimensions
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { NativeBaseProvider, KeyboardAvoidingView } from "native-base";
import { ModalTickerPicker } from './modalInvestTickerPicker';
import { ModalCatPicker} from "./modalInvestCatPicker"
import {ModalTransactionPicker} from "./modalInvestTransactionPicker"


const EditInvestmentPage = ({ navigation, route }) => {
  const { entry } = route.params;

  // useContext
  const { userContext, investmentEntryContext, expenseForceRenderContext } = React.useContext(DataContext);
  const [userId, setUserId] = userContext;
  
  const [dateInvestment,setDateInvestment,
         priceInvestment,setPriceInvestment,
         categoryInvestment,setCategoryInvestment,
         tickerInvestment,setTickerInvestment, 
         qtyInvestment, setQtyInvestment,
         transaction, setTransaction] = investmentEntryContext


   // useState
   const [show, setShow] = React.useState(false);
   
    // Modal for category
    const [isModalVisibleCat, setIsModalVisibleCat] = React.useState(false)

    const changeModalVisibilityCat = (bool) =>{
    setIsModalVisibleCat(bool)
    }

    const setDataCat = (option) =>{
      setCategoryInvestment(option)
    }

   // Modal for ticker
   const [isModalVisibleTicker, setIsModalVisibleTicker] = React.useState(false)

   const changeModalVisibilityTicker = (bool) =>{
    setIsModalVisibleTicker(bool)
   }

   const setDataTicker = (option) =>{
     setTickerInvestment(option)
   }

     // Modal for transaction
  const [isModalVisibleTransaction, setIsModalVisibleTransaction] = React.useState(false)

  const changeModalVisibilityTransaction = (bool) =>{
  setIsModalVisibleTransaction(bool)
  }

  const setDataTransaction = (option) =>{
    setTransaction(option)
  }



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
              ticker: tickerInvestment,
              quantity: qtyInvestment,
              transaction: transaction
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        console.error("edit data investment failed");
      }
      
      const data = await res.json();
      // pass the data into params entry so that showpage will show latest updated data
      navigation.navigate("Show Investment Page", { entry: data });
    } catch (err) {
      console.log(err);
    }
  };

   // Date Picker
   const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dateInvestment);
    setDateInvestment(currentDate);
    
  };


  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            
            <View style={styles.wrapper} >
            <DatePicker
              style={styles.datepicker}
              value={new Date(dateInvestment)}
              onChange={onChangeDate}
            />
            </View>
            
                {/* price */}
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
                    </View>

                  {/* quantity */}
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
                    </View>


                        {/* category */}
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
                      
                        </View>


                    {/* ticker */}
                    <View style={styles.wrapper}>

                          <Pressable 
                            style={styles.pressable}
                            onPress={()=> changeModalVisibilityTicker(true)}
                            >
                            <Text style={styles.catText}>{tickerInvestment}</Text>

                          </Pressable>
                          <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleTicker}
                            onRequestClose={()=> changeModalVisibilityTicker(false)}

                          >
                            <ModalTickerPicker 
                              changeModalVisibilityTicker={changeModalVisibilityTicker}
                              setDataTicker={setDataTicker}
                            />
                            
                          </Modal>

                          </View>



                     {/* Transaction */}
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

                            </View>




            <View style={styles.button}>
              <Button
                title="Update"
                onPress={() => {
                  handleSubmit(entry);
                  // this is needed to force showpage to re-render as it will not mount again
                  //setExpenseForceRender(!expenseForceRender) //not needed
                }}
              />
              <Button
                title="Back"
                onPress={() =>
                  navigation.navigate("Show Investment Page", { entry: entry })
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default EditInvestmentPage;

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e3eaa7",
    // alignItems: "center",
    // justifyContent: "center",
  },
  datepicker: {
    paddingVertical: 100,
    paddingHorizontal: 10,
    width: "100%",
    // borderColor: "gray",
    // borderWidth: 1,
    right: 100,
  },
  textinput: {
    paddingVertical: 1,
    paddingHorizontal: 1,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20

  },
  picker: {
    justifyContent: "center",
    // left: 60,
  },
  button: {
    flexDirection: "row",
    alignSelf: "center",
  },
  inner: {
    padding: 20,
    flex: 1,
    // justifyContent: "flex-end",
  },
  catText: {
    marginVertical: 10,
    fontSize: 22,
    textAlign: "center"
  },
  pressable:{
    backgroundColor: "#87bdd8",
    alignSelf: "stretch",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15
  
  },
  wrapper: {
    fontSize: 20,
    flex: 0.2,
    textAlign: "center",
    flexDirection:'column',
    width: screenWidth*0.86,
    backgroundColor: '#d6d4e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 1,
    margin: '1%',
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: .22,
    elevation: 3,
    },
});
