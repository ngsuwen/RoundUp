import React, { useContext } from "react";
import moment from "moment";
import {
  Center,
  NativeBaseProvider,
  Button,
  Text,
  View,
  Pressable,
  Divider,
} from "native-base";
import ShowPageCard from "../../Cards/showPageCard";
import DataContext from "../../../context/DataContext";
import { Entypo } from "@expo/vector-icons";

const ShowExpensePage = ({ navigation, route }) => {
  // useContext
  const { expenseContext, expenseForceRenderContext, expenseEntryContext } =
    useContext(DataContext);
  const [allExpense, reloadExpense] = expenseContext;
  const [expenseForceRender, setExpenseForceRender] = expenseForceRenderContext;
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

  const { entry } = route.params;

  // format date to "YYYY-MM-DD"
  const actualDate = entry.expensesentry.date;
  const formattedDate = moment(actualDate, moment.ISO_8601).format(
    "YYYY-MM-DD"
  );

  // route DELETE
  const deleteExpense = async (id) => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/expense/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status !== 200) {
      console.error("failed to delete expense");
      return;
    }

    //reloadExpense();
    setExpenseForceRender(!expenseForceRender);
    navigation.navigate("Expense GP");
  };

  //need this to populate editexpensepage with specified fields
  const editHandler = () => {
    setAmount(entry.expensesentry.amount);
    setDescription(entry.expensesentry.description);
    setDate(entry.expensesentry.date);
    setCategory(entry.expensesentry.category);
    navigation.navigate("Edit Expense Page", { entry: entry });
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="#fff">
        <View
          width="90%"
          paddingRight={4}
          paddingBottom={1}
          alignItems="flex-end"
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Expense GP");
              setExpenseForceRender(!expenseForceRender);
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        </View>
        <ShowPageCard heading="Date" body={formattedDate} />
        <Divider width="80%"/>
        <ShowPageCard
          heading="Amount"
          body={"$" + entry.expensesentry.amount}
        />
        <Divider width="80%"/>
        <ShowPageCard heading="Category" body={entry.expensesentry.category} />
        <Divider width="80%"/>
        <ShowPageCard
          heading="Description"
          body={entry.expensesentry.description}
        />
        <Button.Group size="sm" mt="5">
          <Button
            variant="outline"
            bgColor="white"
            colorScheme="light"
            onPress={editHandler}
          >
            <Text >Edit</Text>
          </Button>
          <Button colorScheme="danger" onPress={() => deleteExpense(entry._id)}>
          <Text>Delete</Text>
          </Button>
        </Button.Group>
      </Center>
    </NativeBaseProvider>
  );
};

export default ShowExpensePage;
