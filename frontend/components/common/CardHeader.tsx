import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  icon: string;
  title: string;
  marginBottom?: number;
}

const CardHeader: React.FC<Props> = ({ icon, title, marginBottom = 16 }) => (
  <View style={[styles.row, { marginBottom }]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 24, marginRight: 12 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textDark },
});

export default CardHeader;
