// src/views/DataScreen.js
import React from 'react';
import { useAtom } from 'jotai';
import { StyleSheet, ActivityIndicator, Image, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { YStack, H1, H2, Paragraph } from 'tamagui';
import { primaryColorAtom, fontSizeAtom } from '../store/settingsAtoms';

const fetchData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

const DataScreen = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
  });

  const [primaryColor] = useAtom(primaryColorAtom);
  const [fontSize] = useAtom(fontSizeAtom);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.text}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <H1 style={[styles.heading, { color: primaryColor, fontSize }]}>Posts</H1>
      <FlashList
        data={data}
        estimatedItemSize={150}
        renderItem={({ item }) => (
          <YStack style={styles.card}>
            <Image
              source={{ uri: `https://picsum.photos/200?random=${item.id}` }}
              style={styles.image}
            />
            <H2 style={[styles.title, { color: primaryColor, fontSize }]}>{item.title}</H2>
            <Paragraph style={[styles.body, { color: primaryColor, fontSize }]}>
              {item.body}
            </Paragraph>
          </YStack>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    color: '#000', // Explicitly set text color to black
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Explicitly set text color to black
  },
  body: {
    fontSize: 14,
    marginTop: 4,
    color: '#000', // Explicitly set text color to black
  },
  text: {
    color: '#000', // Ensure all text color is black
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default DataScreen;
