import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  description: string;
}

const PlaceholderScreen: React.FC<Props> = ({ title, description }) => (
  <View style={styles.container}>
    <Text style={styles.header}>{title}</Text>
    <Text style={styles.text}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, textAlign: 'center' },
});

export default PlaceholderScreen;
