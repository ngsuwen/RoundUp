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

const ShowCashPage = ({ navigation, route }) => {
  // useContext
  const { cashContext, expenseForceRenderContext, cashEntryContext } =
    useContext(DataContext);
  const [allCash, reloadCash] = cashContext;
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
  ] = cashEntryContext;

  const { entry } = route.params;

  // format date to "YYYY-MM-DD"
  const actualDate = entry.cashentry.date;
  const formattedDate = moment(actualDate, moment.ISO_8601).format(
    "YYYY-MM-DD"
  );

  // route DELETE
  const deleteCash = async (id) => {
    const res = await fetch(
      `https://roundup-api.herokuapp.com/data/Cash/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status !== 200) {
      console.error("failed to delete Cash");
      return;
    }

    //reloadCash();
    setExpenseForceRender(!expenseForceRender);
    navigation.navigate("Index Cash Page");
  };

  //need this to populate editCashpage with specified fields
  const editHandler = () => {
    setAmount(entry.cashentry.amount);
    setDescription(entry.cashentry.description);
    setDate(entry.cashentry.date);
    setCategory(entry.cashentry.category);
    navigation.navigate("Edit Cash Page", { entry: entry });
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
              navigation.navigate("Index Cash Page");
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
          body={"$" + entry.cashentry.amount}
        />
        <Divider width="80%"/>
        <ShowPageCard heading="Category" body={entry.cashentry.category} />
        <Divider width="80%"/>
        <ShowPageCard
          heading="Description"
          body={entry.cashentry.description}
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
          <Button colorScheme="danger" onPress={() => deleteCash(entry._id)}>
          <Text>Delete</Text>
          </Button>
        </Button.Group>
      </Center>
    </NativeBaseProvider>
  );
};

export default ShowCashPage;
