import * as React from 'react';
import { View, Text,SafeAreaView,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import About from './components/about';
import DrawerComponent from './components/drawer1'

const Stack = createNativeStackNavigator();

function App() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <DrawerComponent/>
  // <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen name="Home" component={Home} options={{ title: 'Homepage' }}/>
  //       <Stack.Screen name="About" component={About} options={{ title: 'About' }}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  );
}

export default App;