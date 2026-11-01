import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardHeader, NumberBadge } from '../common';
import { colors } from '../../theme/colors';
import type { AttemptRecord } from '../../type/quiz';

interface Props {
  allowedAttempts: number;
  attempts: AttemptRecord[];
  totalPossibleScore: number;
}

const AttemptHistory: React.FC<Props> = ({ allowedAttempts, attempts, totalPossibleScore }) => (
  <Card accent="success">
    <CardHeader icon="📊" title="Your Attempts" />
    {Array.from({ length: allowedAttempts }).map((_, idx) => {
      const attempt = attempts[idx];
      return (
        <View key={idx} style={styles.attempt}>
          <View style={styles.header}>
            <NumberBadge value={idx + 1} size={28} marginRight={10} />
            <Text style={styles.title}>Attempt {idx + 1}</Text>
          </View>
          {attempt ? (
            <View style={styles.content}>
              <Text style={styles.score}>
                Score: {attempt.score} / {totalPossibleScore}
              </Text>
              <Text style={styles.date}>{new Date(attempt.timestamp).toLocaleString()}</Text>
            </View>
          ) : (
            <Text style={styles.empty}>Not attempted yet</Text>
          )}
        </View>
      );
    })}
  </Card>
);

const styles = StyleSheet.create({
  attempt: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '600', color: colors.textDark },
  content: { marginLeft: 38 },
  score: { fontSize: 14, color: colors.textDark, fontWeight: '500', marginBottom: 4 },
  date: { fontSize: 12, color: colors.textMuted },
  empty: { marginLeft: 38, fontSize: 14, color: colors.placeholder, fontStyle: 'italic' },
});

export default AttemptHistory;
