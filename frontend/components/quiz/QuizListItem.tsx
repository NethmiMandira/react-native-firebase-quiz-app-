import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Quiz } from '../../type/quiz';
import { formatCreatedAt } from '../../utils/date';

interface Props {
  quiz: Quiz;
  onPress: (quiz: Quiz) => void;
}

const QuizListItem: React.FC<Props> = ({ quiz, onPress }) => {
  const createdAt = formatCreatedAt(quiz.createdAt);

  return <TouchableOpacity style={styles.card} onPress={() => onPress(quiz)}>
    <Text style={styles.subject}>{quiz.subject}</Text>
    <Text>Attempts: {quiz.attempts}</Text>
    <Text>Questions: {quiz.questions}</Text>
    <Text>Score per Question: {quiz.score}</Text>
    <Text>Timer: {quiz.timer} minutes</Text>
    {createdAt ? <Text style={styles.createdAt}>Created: {createdAt}</Text> : null}
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#e6f0ff', padding: 20, borderRadius: 8, marginBottom: 15 },
  subject: { fontSize: 20, fontWeight: 'bold', marginBottom: 6, color: '#004080' },
  createdAt: { marginTop: 8, color: '#64748B', fontSize: 12 },
});

export default QuizListItem;
