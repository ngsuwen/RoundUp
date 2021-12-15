import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';
import { NativeBaseProvider, Pressable,ScrollView } from 'native-base';

export default function Entries(){

  const data = [
  {
    date:'01/01/22',
    amount:10,
    desc:'A cup of coffee'
  },
  {
    date:'01/01/22',
    amount:20,
    desc:'some flowers'
  },
  {
    date:'01/01/22',
    amount:5,
    desc:'bread'
  },
  {
    date:'01/01/22',
    amount:10,
    desc:'A cup of coffee'
  },
  {
    date:'01/01/22',
    amount:20,
    desc:'some flowers'
  },
  {
    date:'01/01/22',
    amount:5,
    desc:'bread'
  },
  {
    date:'01/01/22',
    amount:10,
    desc:'A cup of coffee'
  },
  {
    date:'01/01/22',
    amount:20,
    desc:'some flowers'
  },
  {
    date:'01/01/22',
    amount:5,
    desc:'bread'
  }
]

  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable: {
      flex:1,
      alignItems:'stretch',
      justifyContent:'center',
      backgroundColor: '#D1DEFB',
      width: screenWidth*0.9,
      height: screenHeight*0.12,
      borderRadius: 10,
      margin: '1%',
      padding: '3%'
    },
    text:{
      flex:1,
      color:'#494B50',
    },
    entryHeader:{
      flex:1,
      flexDirection:'row',
      alignItems:'stretch',
      justifyContent:'space-around',
    },
    date:{
      flexGrow:1,
      textAlign:'left',
      height:'50%',
      fontSize:screenHeight*0.025,
    },
    amount:{
      flexGrow:1,
      textAlign:'right',
      height:'50%',
      fontSize:screenHeight*0.025,
    },
    desc:{
      flexGrow:1,
      height:'50%',
      fontSize:screenHeight*0.025,
    }
  });
  

  const entries = data.map((entry,index)=>{
    return (
      <Pressable style={styles.pressable}>
      <View style={styles.entryHeader}>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.amount}>{entry.amount}</Text>
      </View>
      <View>
        <Text style={styles.desc}>{entry.desc}</Text>
      </View>
    </Pressable>
    )
  })

  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
          {entries}
        </ScrollView>
      </NativeBaseProvider>
    </View>
  )
}

