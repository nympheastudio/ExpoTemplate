import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import ExampleComponent from '../views/ExampleComponent'; // Assuming ExampleComponent is in screens folder

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Example" component={ExampleComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
