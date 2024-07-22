import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAtom } from 'jotai';
import screens from '../screensConfig';
import { primaryColorAtom, darkModeAtom } from '../store/settingsAtoms';
import { View, useColorScheme } from 'react-native';

const Stack = createStackNavigator();

const Navigator = () => {
  const [primaryColor] = useAtom(primaryColorAtom);
  const [isDarkMode] = useAtom(darkModeAtom);

  const MyTheme = {
    dark: isDarkMode,
    colors: {
      primary: primaryColor,
      background: isDarkMode ? '#000' : '#fff',
      card: isDarkMode ? '#000' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      border: isDarkMode ? '#000' : '#fff',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: isDarkMode ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {Object.entries(screens).map(([name, component]) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
