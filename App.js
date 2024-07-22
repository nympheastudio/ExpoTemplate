import React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigator/Navigator';
import ExampleComponent from './src/views/ExampleComponent'; // Adjust the path as needed

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <JotaiProvider>
        <Navigator />
        <ExampleComponent />
      </JotaiProvider>
    </GestureHandlerRootView>
  );
}
