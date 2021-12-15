import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button} from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';

export default function About({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <Text >About Component</Text>
      {/* button element will have navigation on header as a default */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
