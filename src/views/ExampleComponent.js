// src/views/ExampleComponent.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAtom } from 'jotai';
import { exampleCountAtom } from '../store/jotaiState'; // Adjust the path as needed

const ExampleComponent = () => {
  const [count, setCount] = useAtom(exampleCountAtom);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default ExampleComponent;