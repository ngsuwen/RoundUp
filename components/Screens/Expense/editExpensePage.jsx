import * as React from "react";
import DataContext from "../../../context/DataContext";
import DatePicker from "react-native-neat-date-picker";
import {
  NativeBaseProvider,
  Center,
  Pressable,
  Text,
  View,
  Button,
  Container,
  Input,
  Modal,
  KeyboardAvoidingView,
} from "native-base";
import { ModalPicker } from "./modalExpensePicker";
import moment from "moment";

const EditExpensePage = ({ navigation, route }) => {
  const { entry } = route.params;

  // click handler loading
  const [clicked, setClicked] = React.useState(false);

  // useContext
  const { userContext, expenseEntryContext, expenseForceRenderContext } =
    React.useContext(DataContext);
  const [userId, setUserId] = userContext;

  const [
    date,
    setDate,
    amount,
    setAmount,
    category,
    setCategory,
    description,
    setDescription,
  ] = expenseEntryContext;
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;

  // validation
  const [isAmountValid, setIsAmountValid] = React.useState(true)

  const validateNum = (price) =>{
   const  re = /^[0-9]*$/
   
   // const result = re.test(price)
   // console.log("result", result)
   return re.test(String(price).toLowerCase())
 
 }

 const onAmountBlur = (bool) =>{
   const isAmountValid = validateNum(bool)
   setIsAmountValid(isAmountValid) //set as true or false

 }

  // useState
  const [show, setShow] = React.useState(false);

  // Modal for category
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setCategory(option);
  };

  const handleSubmit = async (expense) => {
    try {
      // event.preventDefault();
      const res = await fetch(
        `https://roundup-api.herokuapp.com/data/expense/${expense._id}/edit`,
        {
          method: "PUT",
          body: JSON.stringify({
            username: userId,
            expensesentry: {
              date: date,
              amount: amount,
              category: category,
              description: description,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        //console.error("edit data expense failed");
        // validation
        if (isAmountValid === false){
          alert("One of the fields is invalid. Create failed!")
          setClicked(false);
          return navigation.navigate("Edit Expense Page", {entry: entry})
        }
      }
      // no field validation error not working
      // if (amount.length < 1 || description.length < 1 ){
      //   alert("One of the fields is empty. Create failed!")
      //   return navigation.navigate("Edit Expense Page", {entry: entry})
      // }

      const data = await res.json();
      // pass the data into params entry so that showpage will show latest updated data
      setClicked(false);
      navigation.navigate("Show Expense Page", { entry: data });
    } catch (err) {
      setClicked(false);
      console.log(err);
    }
  };

  // Date Picker
  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = (date) => {
    setShow(false);
    setDate(date);
  };

  // to show and hide date picker
  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = moment(date, moment.ISO_8601).format("YYYY-MM-DD");

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
          <Container width="90%" p="4" bgColor="#fff">
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
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Amount
            </Text>
            <Input
              width="100%"
              fontSize="sm"
              mt="1"
              color="coolGray.600"
              value={amount.toString()}
              onChangeText={(text) => setAmount(text)}
              onBlur={() =>onAmountBlur(amount)}
            />
            {isAmountValid ? "" : <Text color="red.600">Invalid Amount</Text>}
          </Container>
          <Container width="90%" px="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Category
            </Text>
            <Pressable width="100%" onPress={() => changeModalVisibility(true)}>
              <Text
                fontSize="sm"
                mt="1"
                borderRadius="sm"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
              >
                {category}
              </Text>
            </Pressable>
            <Modal
              isOpen={isModalVisible}
              defaultIsOpen="false"
              onClose={() => changeModalVisibility(false)}
              size="lg"
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
                  <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                  />
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Container>
          <Container width="90%" px="4" pt="4" bgColor="#fff">
            <Text fontSize="sm" fontWeight="bold">
              Description
            </Text>
            <Input
              width="100%"
              fontSize="sm"
              mt="1"
              color="coolGray.600"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </Container>
          <Button.Group size="sm" mt="5">
            <Button
              variant="outline"
              bgColor="white"
              colorScheme="light"
              onPress={() =>
                navigation.navigate("Show Expense Page", { entry: entry })
              }
            >
              <Text>Cancel</Text>
            </Button>
            <Button
              colorScheme="primary"
              onPressIn={()=>setClicked(true)} 
              isLoading={clicked ? true : false}
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

export default EditExpensePage;
