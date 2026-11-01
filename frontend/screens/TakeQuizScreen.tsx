import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Card, ErrorState, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState, WarningState } from '../components/common';
import {
  AttemptHistory,
  AttemptsSummaryCard,
  QuizInfoSummaryCard,
  TakeQuestionCard,
  TimerCard,
} from '../components/takeQuiz';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { colors } from '../theme/colors';
import type { ScreenProps } from '../type/navigation';
import type { AttemptRecord, QuizQuestion } from '../type/quiz';
import { formatTime } from '../utils/quiz';

const TakeQuizScreen: React.FC<ScreenProps<'TakeQuiz'>> = ({ route }) => {
  const {
    quizId,
    subject,
    questions,
    allowedAttempts = 1,
    score = 1,
    perQuestionTimer = 60,
    mentorName,
  } = route.params;

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [timerCount, setTimerCount] = useState(
    perQuestionTimer && perQuestionTimer > 0 ? perQuestionTimer * 60 : 0,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [allAttempts, setAllAttempts] = useState<AttemptRecord[]>([]);
  const [attemptError, setAttemptError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const studentId = auth.currentUser?.uid;
  const hasTimer = !!perQuestionTimer && perQuestionTimer > 0;

  const checkAttemptLimit = useCallback(async () => {
    if (!studentId || !quizId) return;
    try {
      setAttemptError(null);
      const snap = await getDoc(doc(db, 'students', studentId, 'enrolledQuizzes', quizId));
      const data = snap.data();
      setCurrentAttempts(data?.attemptsUsed || 0);
      setLastScore(data?.lastScore ?? null);
      setAllAttempts(Array.isArray(data?.attempts) ? data.attempts : []);
    } catch (error) {
      console.error('Error checking attempts:', error);
      setAttemptError('We could not load your attempt history. Please try again.');
    }
  }, [studentId, quizId]);

  useEffect(() => {
    checkAttemptLimit();
  }, [checkAttemptLimit]);

  const questionScore = (q: QuizQuestion) =>
    q.scorePerQuestion !== undefined && !isNaN(Number(q.scorePerQuestion))
      ? Number(q.scorePerQuestion)
      : score;

  const totalPossibleScore = questions.reduce((acc, q) => acc + questionScore(q), 0);

  const calculateScore = () =>
    questions.reduce((acc, q, index) => {
      const correct = typeof q.correctOption === 'number' ? q.correctOption : 0;
      return acc + (selectedOptions[index] === correct ? questionScore(q) : 0);
    }, 0);

  const allQuestionsAnswered =
    selectedOptions.length === questions.length && selectedOptions.every((opt) => opt !== undefined);

  const handleSubmit = async () => {
    if (isSubmitted || submitting) return;
    if (!allQuestionsAnswered) {
      setWarning('Please answer every question before submitting.');
      return;
    }

    const totalScore = calculateScore();
    setIsSubmitted(true);
    if (!studentId || !quizId) {
      setIsSubmitted(false);
      setAttemptError('Your session expired. Please sign in again.');
      return;
    }

    try {
      setSubmitting(true);
      setAttemptError(null);
      setWarning(null);
      const quizRef = doc(db, 'students', studentId, 'enrolledQuizzes', quizId);
      const data = (await getDoc(quizRef)).data();
      const prevAttempts: AttemptRecord[] = Array.isArray(data?.attempts) ? data.attempts : [];

      await setDoc(
        quizRef,
        {
          quizId,
          subject,
          attemptsUsed: currentAttempts + 1,
          lastScore: totalScore,
          attempts: [...prevAttempts, { score: totalScore, timestamp: Date.now() }],
        },
        { merge: true },
      );

      setSuccess(`Quiz submitted. You scored ${totalScore} points.`);
      setQuizStarted(false);
      setIsSubmitted(false);
      setSelectedOptions([]);
      checkAttemptLimit();
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitted(false);
      setAttemptError('We could not submit your quiz. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Countdown; auto-submit when time runs out
  useEffect(() => {
    if (!quizStarted || !hasTimer || isSubmitted) return;
    if (timerCount > 0) {
      const interval = setInterval(() => setTimerCount((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    handleSubmit();
  }, [timerCount, isSubmitted, quizStarted, hasTimer]);

  const outOfAttempts = currentAttempts >= allowedAttempts;

  const handleStart = () => {
    if (outOfAttempts) {
      setWarning('You have used all attempts for this quiz.');
      return;
    }
    if (hasTimer) setTimerCount(perQuestionTimer * 60);
    setQuizStarted(true);
  };

  const handleSelect = (qIdx: number, optionIndex: number) => {
    const updated = [...selectedOptions];
    updated[qIdx] = optionIndex;
    setSelectedOptions(updated);
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader first={subject} second=" Quiz" subtitle={`By ${mentorName}`} />

        <AttemptsSummaryCard
          used={currentAttempts}
          allowed={allowedAttempts}
          lastScore={lastScore}
          totalPossible={totalPossibleScore}
        />
        {success ? <SuccessState message={success} /> : null}
        {warning ? <WarningState message={warning} /> : null}
        {attemptError ? <ErrorState message={attemptError} onRetry={checkAttemptLimit} /> : null}

        {!quizStarted ? (
          <>
            <QuizInfoSummaryCard questionCount={questions.length} timer={perQuestionTimer} score={score} />

            <PrimaryButton
              label={outOfAttempts ? 'No Attempts Left' : 'Start Quiz'}
              icon={outOfAttempts ? '🔒' : '🚀'}
              disabled={outOfAttempts}
              style={styles.startButton}
              onPress={handleStart}
            />

            {allowedAttempts > 0 && (
              <AttemptHistory
                allowedAttempts={allowedAttempts}
                attempts={allAttempts}
                totalPossibleScore={totalPossibleScore}
              />
            )}
          </>
        ) : (
          <>
            {hasTimer && <TimerCard timeText={formatTime(timerCount)} />}

            {Array.isArray(questions) && questions.length > 0 ? (
              questions.map((q, qIdx) => (
                <TakeQuestionCard
                  key={qIdx}
                  index={qIdx}
                  question={q}
                  selected={selectedOptions[qIdx]}
                  disabled={isSubmitted}
                  onSelect={(optionIndex) => handleSelect(qIdx, optionIndex)}
                />
              ))
            ) : (
              <Card accent="secondary" style={styles.errorCard}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>No question data available.</Text>
              </Card>
            )}

            {!isSubmitted && (
              <PrimaryButton
                label={submitting ? 'Submitting...' : 'Submit Quiz'}
                icon="✓"
                color={colors.success}
                disabled={!allQuestionsAnswered || submitting}
                style={styles.submitButton}
                onPress={handleSubmit}
              />
            )}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
  startButton: { marginHorizontal: 20, marginBottom: 24 },
  submitButton: { marginHorizontal: 20, marginTop: 8 },
  errorCard: { alignItems: 'center' },
  errorIcon: { fontSize: 32, marginBottom: 12 },
  errorText: { fontSize: 16, color: colors.danger, fontWeight: '500', textAlign: 'center' },
});

export default TakeQuizScreen;
