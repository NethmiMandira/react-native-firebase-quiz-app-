import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { ErrorState, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuestionForm } from '../components/question';
import { colors } from '../theme/colors';
import { db } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';

const UpdateQuestionScreen: React.FC<ScreenProps<'UpdateQuestion'>> = ({ route, navigation }) => {
  const {
    quizId,
    questionId,
    question,
    options: initialOptions,
    correctOption: initialCorrectOption,
  } = route.params;

  const [questionText, setQuestionText] = useState(question);
  const [options, setOptions] = useState(initialOptions);
  const [correctOption, setCorrectOption] = useState<number>(initialCorrectOption);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (text: string, index: number) => {
    const next = [...options];
    next[index] = text;
    setOptions(next);
  };

  const handleUpdate = async () => {
    if (saving) return;
    if (!questionText.trim() || options.some((o) => !o.trim())) {
      setSaveError('Please fill in all fields and select the correct option.');
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);
      setSuccess(false);
      await updateDoc(doc(db, 'quizzes', quizId, 'questions', questionId), {
        question: questionText,
        options,
        correctOption,
        updatedAt: new Date(),
      });
      setSuccess(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating question:', error);
      setSaveError('We could not update this question. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenContainer variant="form">
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader first="Update" second=" Question" subtitle="Edit your question and answer options" />

        <QuestionForm
          questionIcon="✏️"
          question={questionText}
          onQuestionChange={setQuestionText}
          options={options}
          onOptionChange={handleOptionChange}
          correctOption={correctOption}
          onSelectCorrect={setCorrectOption}
        />
        {saveError ? <ErrorState message={saveError} onRetry={handleUpdate} /> : null}
        {success ? <SuccessState message="Question updated successfully." /> : null}

        <PrimaryButton
          label={saving ? 'Updating...' : 'Update Question'}
          icon="💾"
          color={colors.success}
          style={styles.button}
          disabled={saving}
          onPress={handleUpdate}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
  button: { marginHorizontal: 20 },
});

export default UpdateQuestionScreen;
