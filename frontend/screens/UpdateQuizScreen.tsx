import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ErrorState, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuizFormFields } from '../components/quiz';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useQuizForm } from '../hooks/useQuizForm';
import type { ScreenProps } from '../type/navigation';
import { isPublished } from '../utils/quiz';

const UpdateQuizScreen: React.FC<ScreenProps<'UpdateQuiz'>> = ({ route, navigation }) => {
  const { quizId, subject, attempts, questions, score, timer } = route.params;
  const { values, setField, isFormValid, validate, toPayload } = useQuizForm({
    subject,
    attempts,
    questions,
    score,
    timer,
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Edit Quiz' });
  }, [navigation]);

  const userId = auth.currentUser?.uid;
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      setSuccess(false);
      const payload = toPayload();
      const quizRef = doc(db, 'quizzes', quizId);
      await setDoc(quizRef, { ...payload, userId, updatedAt: new Date() }, { merge: true });

      // Use the real published flag instead of assuming it
      const snap = await getDoc(quizRef);
      const published = isPublished(snap.data()?.published);

      setSuccess(true);
      navigation.navigate('QuizDetails', {
        quizId,
        subject: payload.subject,
        quiz: { id: quizId, ...payload, published, addedQuestions: 0 },
      });
    } catch (error) {
      console.error('Error updating quiz:', error);
      setSaveError('We could not update this quiz. Please try again.');
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
          <ScreenHeader first="Edit" second=" Quiz" subtitle="Update your quiz settings" />
          <QuizFormFields values={values} onChange={setField} />
          {saveError ? <ErrorState message={saveError} onRetry={onSave} /> : null}
          {success ? <SuccessState message="Quiz updated successfully." /> : null}
          <PrimaryButton
            label="Update Quiz"
            icon="💾"
            disabled={!isFormValid || saving}
            style={styles.button}
            onPress={onSave}
            accessibilityLabel="Update quiz"
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

export default UpdateQuizScreen;
