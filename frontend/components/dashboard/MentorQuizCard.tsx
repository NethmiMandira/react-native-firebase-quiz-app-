import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconBadge, StatItem } from '../common';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';
import type { MentorQuiz } from '../../type/quiz';
import { formatCreatedAt } from '../../utils/date';

interface Props {
  quiz: MentorQuiz;
  mentorName: string;
  onPress: (quiz: MentorQuiz) => void;
  onDelete: (quizId: string) => void;
}

/** Swipe-to-delete quiz card shown on the mentor dashboard. */
const MentorQuizCard: React.FC<Props> = ({ quiz, mentorName, onPress, onDelete }) => {
  const published = quiz.published === true;
  const createdAt = formatCreatedAt(quiz.createdAt);

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(quiz)}
        style={[styles.card, published ? styles.publishedCard : styles.draftCard]}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.subject}>{quiz.subject}</Text>
            <IconBadge
              emoji={published ? '✅' : '⏳'}
              backgroundColor={published ? colors.successSoft : colors.secondarySoft}
            />
          </View>
          <Text style={styles.mentorName}>By {mentorName}</Text>
          {createdAt ? <Text style={styles.createdAt}>Created {createdAt}</Text> : null}
        </View>

        <View style={styles.stats}>
          <StatItem icon="📝" text={`${quiz.questions || 0} Questions`} />
          {quiz.timer ? <StatItem icon="⏱️" text={`${quiz.timer}s per Q`} /> : null}
          {quiz.studentScores && quiz.studentScores.length > 0 ? (
            <StatItem icon="👥" text={`${quiz.studentScores.length} Students`} />
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(quiz.id)} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 20, padding: 20, marginBottom: 16, ...shadow() },
  publishedCard: { borderWidth: 1, borderColor: 'rgba(52, 211, 153, 0.2)' },
  draftCard: { borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.2)' },
  header: { marginBottom: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subject: { fontSize: 18, fontWeight: '700', color: colors.textDark, flex: 1 },
  mentorName: { fontSize: 14, color: colors.textMuted, fontWeight: '500' },
  createdAt: { fontSize: 12, color: colors.placeholder, marginTop: 4, fontWeight: '500' },
  stats: { flexDirection: 'row', flexWrap: 'wrap' },
  deleteButton: {
    backgroundColor: colors.danger,
    position: 'absolute',
    right: 12,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  deleteIcon: { fontSize: 24 },
});

export default MentorQuizCard;
