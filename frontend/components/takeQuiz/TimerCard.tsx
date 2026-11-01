import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from '../common';
import { colors } from '../../theme/colors';

interface Props {
  timeText: string;
}

const TimerCard: React.FC<Props> = ({ timeText }) => (
  <Card accent="secondary" padding={20} style={styles.card}>
    <Text style={styles.icon}>⏱️</Text>
    <Text style={styles.value}>{timeText}</Text>
    <Text style={styles.label}>Remaining</Text>
  </Card>
);

const styles = StyleSheet.create({
  card: { alignItems: 'center' },
  icon: { fontSize: 24, marginBottom: 8 },
  value: { fontSize: 32, fontWeight: '700', color: colors.secondary, marginBottom: 4 },
  label: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
});

export default TimerCard;
