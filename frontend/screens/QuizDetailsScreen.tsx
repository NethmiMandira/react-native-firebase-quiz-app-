import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { EmptyState, ErrorState, LoadingState, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuizActionButtons, QuizInfoCard, QuizStatsGrid } from '../components/quiz';
import { db } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';
import type { Quiz } from '../type/quiz';
import { isPublished } from '../utils/quiz';

const QuizDetailsScreen: React.FC<ScreenProps<'QuizDetails'>> = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { quizId, subject, quiz } = route.params;

  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reload whenever the screen gains focus (e.g. after editing or adding questions)
  const load = async () => {
      setLoading(true);
      setError(null);
      let remote: Partial<Quiz> = {};
      let addedQuestions = 0;
      try {
        const snap = await getDoc(doc(db, 'quizzes', quizId));
        if (snap.exists()) remote = snap.data() as Partial<Quiz>;
        addedQuestions = (await getDocs(collection(db, 'quizzes', quizId, 'questions'))).size;
      } catch (error) {
        console.error('Error loading quiz details:', error);
        setError('We could not load this quiz. Please check your connection and try again.');
      }
      setQuizData({
        ...quiz,
        ...remote,
        id: quizId,
        published: isPublished(remote.published ?? quiz.published),
        addedQuestions,
      });
      setLoading(false);
  };

  useEffect(() => {
    if (!isFocused) return;
    load();
  }, [isFocused, quizId]);

  const handleEditQuiz = () => {
    if (!quizData) return;
    navigation.navigate('CreateQuiz', {
      quizId,
      subject: quizData.subject ?? subject,
      attempts: quizData.attempts,
      questions: quizData.questions,
      score: quizData.score,
      timer: quizData.timer,
      isEdit: true,
    });
  };

  const handlePublishQuiz = async () => {
    if (!quizData) return;
    try {
      await updateDoc(doc(db, 'quizzes', quizId), { published: true });
      setSuccess('Quiz published successfully.');
      setQuizData({ ...quizData, published: true });
    } catch (error) {
      setError('We could not publish this quiz. Please try again.');
      console.error('Error publishing quiz:', error);
    }
  };

  const handleCopyQuizId = () => {
    Clipboard.setString(quizId);
    setSuccess('Quiz ID copied to clipboard.');
  };

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingState message="Loading quiz details..." />
      </ScreenContainer>
    );
  }

  if (!quizData) {
    return (
      <ScreenContainer>
        {error ? (
          <ErrorState fullScreen message={error} onRetry={load} />
        ) : (
          <EmptyState fullScreen icon="📝" message="No quiz data available." tone="error" />
        )}
      </ScreenContainer>
    );
  }

  const addedQuestions = quizData.addedQuestions ?? 0;
  const totalQuestions = quizData.questions ?? 0;
  const published = quizData.published === true;
  const canAddQuestion = addedQuestions < totalQuestions;
  const canPublish = addedQuestions === totalQuestions && !published;

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader first="Quiz" second=" Details" />
        {success ? <SuccessState message={success} /> : null}

        <QuizInfoCard
          subject={quizData.subject ?? subject}
          quizId={quizId}
          published={published}
          addedQuestions={addedQuestions}
          totalQuestions={totalQuestions}
          onCopyId={handleCopyQuizId}
        />

        <QuizStatsGrid
          stats={[
            { icon: '🎯', value: quizData.attempts ?? 'N/A', label: 'Attempts' },
            { icon: '📝', value: quizData.questions ?? 'N/A', label: 'Questions' },
            { icon: '⭐', value: quizData.score ?? 'N/A', label: 'Score/Q' },
            { icon: '⏱️', value: quizData.timer ?? 'N/A', label: 'Timer (min)' },
          ]}
        />

        <View>
          <QuizActionButtons
            published={published}
            canAddQuestion={canAddQuestion}
            canPublish={canPublish}
            onEdit={handleEditQuiz}
            onAddQuestion={() => navigation.navigate('Question', { quizId, subject })}
            onViewQuestions={() => navigation.navigate('QuestionList', { quizId, subject })}
            onPublish={handlePublishQuiz}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
});

export default QuizDetailsScreen;
