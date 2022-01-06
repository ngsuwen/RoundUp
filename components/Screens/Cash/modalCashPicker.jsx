import React from "react";
import { Text, View, ScrollView, Pressable } from "native-base";

const OPTIONS = ["Income", "Savings", "Petty cash", "Bonus", "Allowance", "Others"]

const ModalPicker = (props) => {
  const { changeModalVisibility, setData } = props;

  const onPressItem = (option) => {
    changeModalVisibility(false);
    setData(option);
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <Pressable key={index} onPress={() => onPressItem(item)}>
        <View mb="3" mt="3">
          <Text fontSize="sm">{item}</Text>
        </View>
      </Pressable>
    );
  });
  return <ScrollView>{option}</ScrollView>;
};

export { ModalPicker };
