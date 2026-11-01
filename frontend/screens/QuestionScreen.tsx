import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ErrorState, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuestionForm } from '../components/question';
import { db } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';

const QuestionScreen: React.FC<ScreenProps<'Question'>> = ({ route, navigation }) => {
  const { quizId, subject } = route.params;

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (text: string, index: number) => {
    const next = [...options];
    next[index] = text;
    setOptions(next);
  };

  const handleSubmit = async () => {
    if (saving) return;
    if (!question.trim() || options.some((o) => !o.trim()) || correctOption === null) {
      setSaveError('Please fill in all fields and select the correct option.');
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);
      setSuccess(false);
      const docRef = await addDoc(collection(db, 'quizzes', quizId, 'questions'), {
        question,
        options,
        correctOption,
        createdAt: new Date(),
      });
      await updateDoc(doc(db, 'quizzes', quizId, 'questions', docRef.id), { questionId: docRef.id });

      setSuccess(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding question:', error);
      setSaveError('We could not add this question. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenContainer variant="form">
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader first="Create" second=" Question" subtitle={`Add a new question to your ${subject} quiz`} />

        <QuestionForm
          questionIcon="❓"
          question={question}
          onQuestionChange={setQuestion}
          options={options}
          onOptionChange={handleOptionChange}
          correctOption={correctOption}
          onSelectCorrect={setCorrectOption}
        />
        {saveError ? <ErrorState message={saveError} onRetry={handleSubmit} /> : null}
        {success ? <SuccessState message="Question added successfully." /> : null}

        <PrimaryButton label={saving ? 'Adding...' : 'Add Question'} icon="✨" disabled={saving} style={styles.button} onPress={handleSubmit} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
  button: { marginHorizontal: 20 },
});

export default QuestionScreen;
