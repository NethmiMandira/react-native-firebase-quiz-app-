import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardHeader } from '../common';
import { colors } from '../../theme/colors';

interface Props {
  questionCount: number;
  timer?: number;
  score: number;
}

const QuizInfoSummaryCard: React.FC<Props> = ({ questionCount, timer, score }) => {
  const rows = [
    { label: 'Questions', value: String(questionCount) },
    { label: 'Timer', value: timer ? `${timer} min` : 'No timer' },
    { label: 'Score per Question', value: String(score) },
  ];

  return (
    <Card accent="secondary">
      <CardHeader icon="📋" title="Quiz Information" />
      <View style={styles.content}>
        {rows.map((r) => (
          <View key={r.label} style={styles.row}>
            <Text style={styles.label}>{r.label}</Text>
            <Text style={styles.value}>{r.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: { marginTop: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  label: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  value: { fontSize: 14, color: colors.textDark, fontWeight: '600' },
});

export default QuizInfoSummaryCard;
