import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  icon: string;
  text: string;
}

const StatItem: React.FC<Props> = ({ icon, text }) => (
  <View style={styles.item}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 },
  icon: { fontSize: 14, marginRight: 4 },
  text: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
});

export default StatItem;
