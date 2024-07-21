// App.js
import 'react-native-match-media-polyfill';
import React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import Navigator from './src/navigator/Navigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <TamaguiProvider config={config}>
            <Navigator />
          </TamaguiProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
