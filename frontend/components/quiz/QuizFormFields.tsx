import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, CardHeader, LabeledInput } from '../common';
import { colors } from '../../theme/colors';
import type { QuizFormValues } from '../../hooks/useQuizForm';
import TimerPicker from './TimerPicker';

interface Props {
  values: QuizFormValues;
  onChange: <K extends keyof QuizFormValues>(key: K, value: QuizFormValues[K]) => void;
}

/** The three cards (basic info, settings, timer) shared by Create & Update quiz. */
const QuizFormFields: React.FC<Props> = ({ values, onChange }) => (
  <>
    <Card>
      <CardHeader icon="📚" title="Basic Information" marginBottom={20} />
      <LabeledInput
        label="Subject Name"
        placeholder="Enter subject name"
        value={values.subject}
        onChangeText={(t) => onChange('subject', t)}
        accessibilityLabel="Subject input"
        autoCapitalize="words"
      />
    </Card>

    <Card>
      <CardHeader icon="⚙️" title="Quiz Settings" marginBottom={20} />
      <LabeledInput
        label="Number of Attempts"
        placeholder="Enter number of attempts"
        value={values.attempts}
        onChangeText={(t) => onChange('attempts', t)}
        keyboardType="numeric"
        accessibilityLabel="Number of attempts input"
      />
      <LabeledInput
        label="Number of Questions"
        placeholder="Enter number of questions"
        value={values.questions}
        onChangeText={(t) => onChange('questions', t)}
        keyboardType="numeric"
        accessibilityLabel="Number of questions input"
      />
      <LabeledInput
        label="Score per Question"
        placeholder="Enter score per question"
        value={values.score}
        onChangeText={(t) => onChange('score', t)}
        keyboardType="numeric"
        accessibilityLabel="Score per question input"
      />
    </Card>

    <Card>
      <CardHeader icon="⏱️" title="Timer Settings" marginBottom={20} />
      <Text style={styles.label}>Quiz Timer</Text>
      <TimerPicker value={values.timer} onChange={(v) => onChange('timer', v)} />
    </Card>
  </>
);

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.textMuted, marginBottom: 8 },
});

export default QuizFormFields;
