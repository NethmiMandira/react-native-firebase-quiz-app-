import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';

interface Stat {
  icon: string;
  value: string | number;
  label: string;
}

interface Props {
  stats: Stat[];
}

const QuizStatsGrid: React.FC<Props> = ({ stats }) => (
  <View style={styles.grid}>
    {stats.map((s) => (
      <View key={s.label} style={styles.card}>
        <Text style={styles.icon}>{s.icon}</Text>
        <Text style={styles.value}>{s.value}</Text>
        <Text style={styles.label}>{s.label}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, marginBottom: 20 },
  card: {
    width: (width - 60) / 2,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: { fontSize: 24, marginBottom: 8 },
  value: { fontSize: 20, fontWeight: '700', color: colors.textDark, marginBottom: 4 },
  label: { fontSize: 12, color: colors.textMuted, fontWeight: '500', textAlign: 'center' },
});

export default QuizStatsGrid;
