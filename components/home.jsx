import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';
import { NativeBaseProvider, Pressable } from 'native-base';


export default function Home({ navigation }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable: {
      backgroundColor: 'salmon',
      borderRadius: 5,
      padding: '2%',
      margin: '5%',
    },
    text:{
      color:'#fff'
    }
  });
  


  return (
    <View style={styles.container}>
      <Text>Home Page Component</Text>
      {/* button component can't be styled so we use a pressable component */}
      <NativeBaseProvider>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
          <Text style={styles.text}>Go to About</Text>
        </Pressable>
      </NativeBaseProvider>
    </View>
  )
}
