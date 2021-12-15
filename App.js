import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import About from './components/about';

const Stack = createNativeStackNavigator();

function App() {

  return (
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Homepage' }}/>
        <Stack.Screen name="About" component={About} options={{ title: 'About' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;