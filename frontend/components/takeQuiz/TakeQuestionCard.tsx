import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, LetterBadge, NumberBadge } from '../common';
import { colors } from '../../theme/colors';
import type { QuizQuestion } from '../../type/quiz';
import { optionLetter } from '../../utils/quiz';

interface Props {
  index: number;
  question: QuizQuestion;
  selected?: number;
  disabled?: boolean;
  onSelect: (optionIndex: number) => void;
}

/** A single question with tappable answer options, shown while taking a quiz. */
const TakeQuestionCard: React.FC<Props> = ({ index, question, selected, disabled, onSelect }) => (
  <Card>
    <View style={styles.header}>
      <NumberBadge value={index + 1} />
      <Text style={styles.questionText}>{question.question}</Text>
    </View>

    <View style={styles.options}>
      {Array.isArray(question.options) &&
        question.options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => onSelect(i)}
              disabled={disabled}
            >
              <LetterBadge letter={optionLetter(i)} active={isSelected} />
              <Text style={[styles.optionText, isSelected && styles.selectedText]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  questionText: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textDark, lineHeight: 24 },
  options: { marginTop: 8 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedOption: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  optionText: { flex: 1, fontSize: 14, color: colors.textDark, fontWeight: '500' },
  selectedText: { fontWeight: '600' },
});

export default TakeQuestionCard;
