import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardHeader } from '../common';
import { colors } from '../../theme/colors';

interface Props {
  used: number;
  allowed: number;
  lastScore: number | null;
  totalPossible: number;
}

const AttemptsSummaryCard: React.FC<Props> = ({ used, allowed, lastScore, totalPossible }) => (
  <Card>
    <CardHeader icon="🎯" title="Attempts" />
    <View style={styles.info}>
      <View style={styles.stat}>
        <Text style={styles.label}>Used</Text>
        <Text style={styles.value}>
          {used} <Text style={styles.unit}>/ {allowed}</Text>
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={styles.label}>Last Score</Text>
        <Text style={styles.value}>
          {lastScore !== null ? (
            <>
              {lastScore} <Text style={styles.unit}>/ {totalPossible}</Text>
            </>
          ) : (
            'N/A'
          )}
        </Text>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  info: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  stat: { alignItems: 'center' },
  label: { fontSize: 14, color: colors.textMuted, fontWeight: '500', marginBottom: 4 },
  value: { fontSize: 24, fontWeight: '700', color: colors.textDark },
  unit: { fontSize: 16, color: colors.textMuted, fontWeight: '500' },
  divider: { height: 40, width: 1, backgroundColor: colors.border },
});

export default AttemptsSummaryCard;
