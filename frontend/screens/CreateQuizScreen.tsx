import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { ErrorState, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuizFormFields } from '../components/quiz';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useQuizForm } from '../hooks/useQuizForm';
import { generateUniqueQuizId } from '../services/quizService';
import type { ScreenProps } from '../type/navigation';

const CreateQuizScreen: React.FC<ScreenProps<'CreateQuiz'>> = ({ route, navigation }) => {
  const { quizId, subject, attempts, questions, score, timer, isEdit } = route.params;
  const { values, setField, isFormValid, validate, toPayload } = useQuizForm({
    subject,
    attempts,
    questions,
    score,
    timer,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? 'Edit Quiz' : 'Create Quiz' });
  }, [navigation, isEdit]);

  const user = auth.currentUser;
  const userId = user?.uid;
  const mentorName = user?.displayName || 'Mentor';

  const onSave = async () => {
    if (saving) return;
    const error = validate();
    if (error) {
      setSaveError(error);
      return;
    }
    if (!userId) {
      setSaveError('Your session expired. Please sign in again.');
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);
      setSaved(false);
      const quizData = { ...toPayload(), userId, mentorName };

      if (isEdit && quizId !== 'new') {
        await setDoc(doc(db, 'quizzes', quizId), quizData, { merge: true });
      } else {
        const newQuizId = await generateUniqueQuizId();
        if (!newQuizId) {
          setSaveError('We could not generate a quiz ID. Please try again.');
          return;
        }
        await setDoc(doc(db, 'quizzes', newQuizId), { ...quizData, createdAt: new Date() });
      }

      setSaved(true);
    } catch (error: unknown) {
      console.error('Error saving quiz:', error);
      setSaveError('We could not save this quiz. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenContainer variant="form">
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader
            first={isEdit ? 'Edit' : 'Create'}
            second=" Quiz"
            subtitle={isEdit ? 'Update your quiz settings' : 'Set up your new quiz configuration'}
          />

          <QuizFormFields values={values} onChange={setField} />
          {saved ? (
            <SuccessState
              message="Quiz saved successfully."
              actionLabel="View My Quizzes"
              onAction={() => navigation.navigate('MentorDashboardScreen')}
            />
          ) : null}
          {saveError ? <ErrorState message={saveError} onRetry={onSave} /> : null}

          <PrimaryButton
            label={isEdit ? 'Update Quiz' : 'Create Quiz'}
            icon={isEdit ? '💾' : '✨'}
            disabled={!isFormValid || saving}
            style={styles.button}
            onPress={onSave}
            accessibilityLabel="Save quiz"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
  button: { marginHorizontal: 20 },
});

export default CreateQuizScreen;
