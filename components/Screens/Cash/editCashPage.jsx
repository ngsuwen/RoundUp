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
import { ModalPicker } from "./modalCashPicker";
import moment from "moment";

const EditCashPage = ({ navigation, route }) => {
  const { entry } = route.params;

  // useContext
  const { userContext, cashEntryContext, expenseForceRenderContext } =
    React.useContext(DataContext);
  const [userId, setUserId] = userContext;

  const [
    dateCash,
    setDateCash,
    amountCash,
    setAmountCash,
    categoryCash,
    setCategoryCash,
    descriptionCash,
    setDescriptionCash,
  ] = cashEntryContext;
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
    setCategoryCash(option);
  };

  const handleSubmit = async (cash) => {
    try {
      // event.preventDefault();
      const res = await fetch(
        `https://roundup-api.herokuapp.com/data/cash/${cash._id}/edit`,
        {
          method: "PUT",
          body: JSON.stringify({
            username: userId,
            cashentry: {
              date: dateCash,
              amount: amountCash,
              category: categoryCash,
              description: descriptionCash,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        console.error("edit data cash failed");
      }
      // validation
      if (isAmountValid === false){
        alert("One of the fields is invalid. Create failed!")
        return navigation.navigate("Edit Cash Page", {entry: entry})
      }
      if (amountCash.length < 1 || descriptionCash.length < 1 ){
        alert("One of the fields is empty. Create failed!")
        return navigation.navigate("Edit Cash Page", {entry: entry})
      }

      const data = await res.json();
      // pass the data into params entry so that showpage will show latest updated data
      navigation.navigate("Show Cash Page", { entry: data });
    } catch (err) {
      console.log(err);
    }
  };

  // Date Picker
  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = (date) => {
    setShow(false);
    setDateCash(date);
  };

  // to show and hide date picker
  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = moment(dateCash, moment.ISO_8601).format("YYYY-MM-DD");

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
              value={amountCash.toString()}
              onChangeText={(text) => setAmountCash(text)}
              onBlur={() =>onAmountBlur(amountCash)}
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
                {categoryCash}
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
              value={descriptionCash}
              onChangeText={(text) => setDescriptionCash(text)}
            />
          </Container>
          <Button.Group size="sm" mt="5">
            <Button
              variant="outline"
              bgColor="white"
              colorScheme="light"
              onPress={() =>
                navigation.navigate("Show Cash Page", { entry: entry })
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

export default EditCashPage;
