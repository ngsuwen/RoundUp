import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import MonthPicker from "react-native-month-picker";

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  input: {
    flex:1,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    letterSpacing:15,
    // borderWidth: 0.2,
    borderRadius: 10,
    width: '90%',
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    color:'#536162',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
    
  },
  confirmButton: {
    borderWidth: 0.5,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MonthPickerModal({ placeholder }) {
  const [isOpen, toggleOpen] = useState(false);
  const [value, onChange] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {value ? moment(value).format('MMM YYYY') : moment().format('MMM YYYY')}
        </Text>
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        transparent
        animationType="fade"
        visible={isOpen}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <MonthPicker
              selectedDate={value || new Date()}
              onMonthChange={onChange}
              selectedBackgroundColor='#B4AEE8'
              prevText='Prev'
              nextText='Next'
              currentMonthTextStyle= {{color: '#B4AEE8', fontWeight:'bold' }}
              swipable = {true} 
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => toggleOpen(false)}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
