import * as React from "react";
import DataContext from "../../../context/DataContext";
import DatePicker from "@react-native-community/datetimepicker";
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
} from "native-base";
import { ModalPicker } from "./modalExpensePicker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const EditExpensePage = ({ navigation, route }) => {
  const { entry } = route.params;

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
        console.error("edit data expense failed");
      }

      const data = await res.json();
      // pass the data into params entry so that showpage will show latest updated data
      navigation.navigate("Show Expense Page", { entry: data });
    } catch (err) {
      console.log(err);
    }
  };

  // Date Picker
  const onChangeDate = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || new Date(date);
    setDate(currentDate);
  };

  // to show and hide date picker
  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = moment(date, moment.ISO_8601).format("YYYY-MM-DD");

  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="coolGray.100">
        <Pressable
          width="90%"
          onPress={() =>
            navigation.navigate("Show Expense Page", { entry: entry })
          }
        >
          <View p="4" flexDirection="row" alignItems="flex-start">
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text fontSize="lg">Back</Text>
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
                  fontSize: "lg"
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
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </Container>
        <Button
          variant="outline"
          bgColor="white"
          colorScheme="light"
          onPress={() => {
            handleSubmit(entry);
          }}
          mt="5"
        >
          <Text fontSize="md">Update</Text>
        </Button>
      </Center>
    </NativeBaseProvider>
  );
};

export default EditExpensePage;
