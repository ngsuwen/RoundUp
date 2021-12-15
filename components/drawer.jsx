import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home';
import About from './about';
import Showpage from './showpage';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Show Page" screenOptions={{
        headerShown:true, 
        headerStyle:{
          backgroundColor:'white',
          elevation:0,
          shadowOpacity:0
        },
        headerTitle:''
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Show Page" component={Showpage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
