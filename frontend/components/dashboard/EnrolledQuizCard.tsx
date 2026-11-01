import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconBadge, MessageModal, StatItem } from '../common';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';
import type { EnrolledQuiz } from '../../type/quiz';

interface Props {
  quiz: EnrolledQuiz;
  onPress: (quiz: EnrolledQuiz) => void;
  onRemove: (quizId: string) => void;
}

const EnrolledQuizCard: React.FC<Props> = ({ quiz, onPress, onRemove }) => {
  const [confirming, setConfirming] = React.useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPress(quiz)} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subject}>{quiz.subject}</Text>
          <IconBadge emoji="▶️" fontSize={14} backgroundColor={colors.successSoft} />
        </View>
        <Text style={styles.mentor}>By {quiz.mentorName}</Text>
        <View style={styles.stats}>
          <StatItem icon="📝" text={`${quiz.questions?.length || 0} Questions`} />
          {quiz.attempts ? <StatItem icon="🎯" text={`${quiz.attempts} Attempts`} /> : null}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={() => setConfirming(true)}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
      <MessageModal
        visible={confirming}
        title="Remove quiz?"
        message="This will remove the quiz from your enrolled list."
        tone="warning"
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          onRemove(quiz.id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(116, 97, 238, 0.05)',
    ...shadow(),
  },
  content: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subject: { fontSize: 18, fontWeight: '700', color: colors.textDark, flex: 1 },
  mentor: { fontSize: 14, color: colors.textMuted, marginBottom: 12, fontWeight: '500' },
  stats: { flexDirection: 'row', flexWrap: 'wrap' },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.dangerSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: { fontSize: 16 },
});

export default EnrolledQuizCard;
