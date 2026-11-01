import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconBadge, StatItem } from '../common';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';
import type { EnrolledQuiz } from '../../type/quiz';

interface Props {
  quiz: EnrolledQuiz;
  onEnroll: (quiz: EnrolledQuiz) => void;
}

const SearchResultCard: React.FC<Props> = ({ quiz, onEnroll }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.subject}>{quiz.subject}</Text>
      <IconBadge emoji="📚" />
    </View>
    <Text style={styles.mentor}>By {quiz.mentorName}</Text>
    <View style={styles.stats}>
      <StatItem icon="📝" text={`${quiz.questions?.length || 0} Questions`} />
      {quiz.timer ? <StatItem icon="⏱️" text={`${quiz.timer}s per Q`} /> : null}
    </View>
    <TouchableOpacity style={styles.enrollButton} onPress={() => onEnroll(quiz)}>
      <Text style={styles.enrollText}>✨ Enroll Now</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(116, 97, 238, 0.1)',
    ...shadow(colors.primary, 0.15, 8, 16, 8),
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subject: { fontSize: 18, fontWeight: '700', color: colors.textDark, flex: 1 },
  mentor: { fontSize: 14, color: colors.textMuted, marginBottom: 12, fontWeight: '500' },
  stats: { flexDirection: 'row', flexWrap: 'wrap' },
  enrollButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  enrollText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});

export default SearchResultCard;
