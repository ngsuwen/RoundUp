import React, { useContext } from "react";
import moment from "moment";
import { Center, NativeBaseProvider, Button, Text, View } from "native-base";
import ShowPageCard from "../../Cards/showPageCard";
import DataContext from "../../../context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

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
      <Center flex={1} bgColor="coolGray.100">
        <Pressable
          width="90%"
          onPress={() => {
            navigation.navigate("Expense GP");
            setExpenseForceRender(!expenseForceRender);
          }}
        >
          <View
            p="4"
            flexDirection="row"
            alignItems="flex-start"
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text fontSize="lg">Back</Text>
          </View>
        </Pressable>
        <ShowPageCard heading="Date" body={formattedDate} />
        <ShowPageCard
          heading="Amount"
          body={"$" + entry.expensesentry.amount}
        />
        <ShowPageCard heading="Category" body={entry.expensesentry.category} />
        <ShowPageCard
          heading="Description"
          body={entry.expensesentry.description}
        />
        <Button.Group size="lg" mt="5">
          <Button
            variant="outline"
            bgColor="white"
            colorScheme="light"
            onPress={editHandler}
          >
            <Text fontSize="md">Edit</Text>
          </Button>
          <Button colorScheme="danger" onPress={() => deleteExpense(entry._id)}>
            Delete
          </Button>
        </Button.Group>
      </Center>
    </NativeBaseProvider>
  );
};

export default ShowExpensePage;
