import React, { useState, useContext } from "react";
import DataContext from "../../context/DataContext";
import { View, NativeBaseProvider, Button, Modal } from "native-base";
import moment from "moment";
import MonthPicker from "react-native-month-picker";
import { AntDesign } from "@expo/vector-icons";

export default function MonthPickerModal() {
  const { monthContext } = useContext(DataContext);
  const [selectedMonth, setSelectedMonth] = monthContext;
  const [isOpen, toggleOpen] = useState(false);

  const changeHandler = (date) => {
    setSelectedMonth(date);
    toggleOpen(false);
  };

  return (
    <View>
      <Button onPress={() => toggleOpen(true)}>
        {moment(selectedMonth).format("MMM YYYY")}
      </Button>
      <Modal isOpen={isOpen} onClose={() => toggleOpen(false)}>
        <Modal.Content width="70%" bgColor="#fff">
          <Modal.Body>
            <MonthPicker
              selectedDate={selectedMonth || new Date()}
              onMonthChange={changeHandler}
              selectedBackgroundColor="#fff"
              nextIcon={<AntDesign name="right" size={20} color="black" />}
              prevIcon={<AntDesign name="left" size={20} color="black" />}
              selectedBackgroundColor="grey"
              selectedMonthTextStyle={{ color: "#fff", fontWeight: "bold" }}
              swipable={true}
            />
            <Button
              variant="outline"
              colorScheme="light"
              onPress={() => toggleOpen(false)}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}
