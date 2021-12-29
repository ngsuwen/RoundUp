import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button, Pressable } from 'react-native';

export default function homepageExpenseCard() {

    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height

    const styles = StyleSheet.create({
    wrapper: {
    flex: 1,
    flexDirection:'column',
    width: screenWidth*0.9,
    backgroundColor: '#F7F6F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: '3%',
    shadowColor: "#000",
    shadowOffset: {
    width: 2,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    },
    pressableWrapper: {
    display:'flex',
    height:'30%',
    width:'100%',
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'center',
    borderRadius: 5,
    margin: '5%',
    },
    pressable: {
    flex:1,
    backgroundColor: '#F4E6E6',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    padding: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    },
    })
    
    return (
    <View style={styles.wrapper}>
        <Text>Expense</Text>
        <View>
            <Text>Expense Balance</Text>
            <Text>% Increase (Compared to last month)</Text>
        </View>
        <View style={styles.pressableWrapper}>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
                <Text style={styles.text}>View</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
                <Text style={styles.text}>Add</Text>
            </Pressable>
        </View>
    </View>
    )
  }
  