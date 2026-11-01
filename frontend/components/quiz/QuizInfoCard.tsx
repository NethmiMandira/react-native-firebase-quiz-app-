import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, IconBadge } from '../common';
import { colors } from '../../theme/colors';

interface Props {
  subject: string;
  quizId: string;
  published: boolean;
  addedQuestions: number;
  totalQuestions: number;
  onCopyId: () => void;
}

const QuizInfoCard: React.FC<Props> = ({
  subject,
  quizId,
  published,
  addedQuestions,
  totalQuestions,
  onCopyId,
}) => {
  const progress = totalQuestions > 0 ? (addedQuestions / totalQuestions) * 100 : 0;

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.subjectWrap}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
        <IconBadge
          emoji={published ? '✅' : '⏳'}
          size={40}
          fontSize={20}
          backgroundColor={colors.successSoft}
        />
      </View>

      <View style={styles.idBlock}>
        <Text style={[styles.label, styles.labelGap]}>Quiz ID</Text>
        <View style={styles.idRow}>
          <Text style={styles.idText}>{quizId}</Text>
          <TouchableOpacity onPress={onCopyId} style={styles.copyButton}>
            <Text style={styles.copyIcon}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={[styles.label, styles.labelGap]}>Question Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {addedQuestions} of {totalQuestions} questions added
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  subjectWrap: { flex: 1 },
  label: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  labelGap: { marginBottom: 8 },
  subject: { fontSize: 24, fontWeight: '700', color: colors.textDark, marginTop: 4 },
  idBlock: { marginBottom: 20 },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    padding: 12,
    borderRadius: 12,
  },
  idText: { flex: 1, fontSize: 14, fontFamily: 'monospace', color: colors.textDark, fontWeight: '600' },
  copyButton: { padding: 4 },
  copyIcon: { fontSize: 18 },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  progressText: { fontSize: 12, color: colors.textMuted, fontWeight: '500' },
});

export default QuizInfoCard;
