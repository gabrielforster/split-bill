import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { ListItem } from '../../components/ListItem';

type Items = Array<{description: string, amount: number}>;

export default function TabOneScreen() {
  const [items, _] = useState<Items>([
    {
      description: "Batatinha no mercado",
      amount: 200
    },
    {
      description: "Melancia no mercado",
      amount: 100
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of groups!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
