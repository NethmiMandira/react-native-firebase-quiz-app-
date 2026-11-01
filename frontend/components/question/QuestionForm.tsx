import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, CardHeader } from '../common';
import { colors } from '../../theme/colors';
import { optionLetter } from '../../utils/quiz';

interface Props {
  questionIcon: string;
  question: string;
  onQuestionChange: (text: string) => void;
  options: string[];
  onOptionChange: (text: string, index: number) => void;
  correctOption: number | null;
  onSelectCorrect: (index: number) => void;
}

/** Question text + 4 options form, shared by "Add" and "Update" question screens. */
const QuestionForm: React.FC<Props> = ({
  questionIcon,
  question,
  onQuestionChange,
  options,
  onOptionChange,
  correctOption,
  onSelectCorrect,
}) => (
  <>
    <Card>
      <CardHeader icon={questionIcon} title="Question Text" />
      <TextInput
        style={styles.questionInput}
        placeholder="Enter your question here..."
        placeholderTextColor={colors.placeholder}
        value={question}
        onChangeText={onQuestionChange}
        multiline
        numberOfLines={3}
      />
    </Card>

    <Card accent="secondary">
      <CardHeader icon="📝" title="Answer Options" />

      {options.map((opt, index) => {
        const selected = correctOption === index;
        return (
          <View key={index} style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionLabel}>Option {optionLetter(index)}</Text>
              <TouchableOpacity
                style={[styles.correctButton, selected && styles.selectedCorrect]}
                onPress={() => onSelectCorrect(index)}
              >
                <Text style={[styles.correctText, selected && styles.selectedCorrectText]}>
                  {selected ? '✓' : '○'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.optionInput}
              placeholder={`Enter option ${optionLetter(index)}`}
              placeholderTextColor={colors.placeholder}
              value={opt}
              onChangeText={(text) => onOptionChange(text, index)}
            />
          </View>
        );
      })}

      <View style={styles.hint}>
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintText}>Tap the circle to mark the correct answer</Text>
      </View>
    </Card>
  </>
);

const styles = StyleSheet.create({
  questionInput: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.textDark,
    backgroundColor: colors.surface,
    minHeight: 80,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  optionContainer: { marginBottom: 16 },
  optionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  optionLabel: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  correctButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedCorrect: { backgroundColor: colors.success, borderColor: colors.success },
  correctText: { fontSize: 16, fontWeight: '600', color: colors.textMuted },
  selectedCorrectText: { color: colors.white },
  optionInput: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.textDark,
    backgroundColor: colors.surface,
    fontWeight: '500',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  hintIcon: { fontSize: 16, marginRight: 8 },
  hintText: { fontSize: 14, color: '#92400E', fontWeight: '500', flex: 1 },
});

export default QuestionForm;
