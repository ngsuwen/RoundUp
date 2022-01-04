import React, { useState, useEffect } from "react";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
import {
  NativeBaseProvider,
  Pressable,
  Text,
  Button,
  Modal,
  Center,
  Container,
  Input,
  View,
  KeyboardAvoidingView
} from "native-base";
import DatePicker from "@react-native-community/datetimepicker";
import { ModalPicker } from "./modalExpensePicker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const EntryExpensePage = ({ navigation }) => {
  // useContext
  const { userContext, expenseEntryContext, expenseForceRenderContext } =
    useContext(DataContext);
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

  // useState
  const [show, setShow] = useState(false);

  // Modal for category
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setCategory(option);
  };

  // clear states onload at entryexpense page
  useEffect(() => {
    const resetPage = navigation.addListener("focus", () => {
      setDate(new Date());
      setAmount([]);
      setCategory("Select Category...");
      setDescription("");
    });
    return resetPage;
  }, [expenseForceRender]);

  // Date Picker
  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || new Date(date);
    setDate(currentDate);
  };

  // to show and hide date picker
  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = moment(date, moment.ISO_8601).format("YYYY-MM-DD");

  //work in progress
  //  const categories = ["Shopping", "Food", "Health", "Transportation", "Household"]
  //  const CategoryList = () =>{
  //    return <View style={styles.categoryContainer}>
  //      {categories.map((item, index)=>(
  //        <Text key={index} style={[styles.categoryText]}>{item}</Text>
  //      ))}
  //    </View>
  //  }
  ///////////////////////

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(
        "https://roundup-api.herokuapp.com/data/expense",
        {
          method: "POST",
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
        console.error("create data expense failed");
      }

      setExpenseForceRender(!expenseForceRender);
    } catch (err) {
      console.log(err);
    }

    navigation.navigate("Expense GP");
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        keyboardVerticalOffset={120}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center flex={1} bgColor="coolGray.100">
          <Pressable
            width="90%"
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <View p="4" flexDirection="row" alignItems="flex-start">
              <Ionicons name="chevron-back-outline" size={24} color="black" />
              <Text fontSize="lg">Home</Text>
            </View>
          </Pressable>
          <Container
            borderColor="coolGray.200"
            borderWidth="1"
            width="90%"
            p="4"
            bgColor="#fff"
          >
            <Text fontSize="md" fontWeight="bold">
              Date
            </Text>
            <Pressable width="100%" onPress={showDatepicker}>
              <Text
                fontSize="lg"
                mt="1"
                borderRadius="sm"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
              >
                {formattedDate}
              </Text>
            </Pressable>
            {show && (
              <DatePicker value={new Date(date)} onChange={onChangeDate} />
            )}
          </Container>
          <Container
            borderColor="coolGray.200"
            borderWidth="1"
            width="90%"
            p="4"
            bgColor="#fff"
          >
            <Text fontSize="md" fontWeight="bold">
              Amount
            </Text>
            <Input
              width="100%"
              fontSize="lg"
              mt="1"
              color="coolGray.600"
              placeholder="amount"
              value={amount.toString()}
              onChangeText={(text) => setAmount(text)}
            />
          </Container>
          <Container
            borderColor="coolGray.200"
            borderWidth="1"
            width="90%"
            p="4"
            bgColor="#fff"
          >
            <Text fontSize="md" fontWeight="bold">
              Category
            </Text>
            <Pressable width="100%" onPress={() => changeModalVisibility(true)}>
              <Text
                fontSize="lg"
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
                    fontSize: "lg",
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
          <Container
            borderColor="coolGray.200"
            borderWidth="1"
            width="90%"
            p="4"
            bgColor="#fff"
          >
            <Text fontSize="md" fontWeight="bold">
              Description
            </Text>
            <Input
              width="100%"
              fontSize="lg"
              mt="1"
              color="coolGray.600"
              placeholder="description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </Container>
          <Button
            variant="outline"
            bgColor="white"
            colorScheme="light"
            onPress={handleSubmit}
            mt="5"
          >
            <Text fontSize="md">Submit</Text>
          </Button>
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default EntryExpensePage;
