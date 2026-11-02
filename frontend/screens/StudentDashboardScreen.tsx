import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { EmptyState, ErrorState, MessageModal, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { EnrolledQuizCard, QuizSearchBox, SearchResultCard } from '../components/dashboard';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { colors } from '../theme/colors';
import { width } from '../theme/layout';
import type { ScreenProps } from '../type/navigation';
import type { EnrolledQuiz, QuizQuestion } from '../type/quiz';

const StudentDashboardScreen: React.FC<ScreenProps<'StudentDashboardScreen'>> = ({ navigation }) => {
  const [quizIdInput, setQuizIdInput] = useState('');
  const [searchedQuiz, setSearchedQuiz] = useState<EnrolledQuiz | null>(null);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState<EnrolledQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [enrolledError, setEnrolledError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const user = auth.currentUser;
  const studentId = user?.uid;

  const searchQuiz = async () => {
    const id = quizIdInput.trim();
    if (!id) return;
    setLoading(true);
    setSearchError(null);
    try {
      const quizSnap = await getDoc(doc(db, 'quizzes', id));

      if (!quizSnap.exists()) {
        setNotice('Quiz not found. Check the ID and try again.');
        setSearchedQuiz(null);
        return;
      }

      const data = quizSnap.data();
      if (data.published !== true && data.published !== 'true' && data.published !== 1) {
        setNotice('This quiz is not published yet.');
        setSearchedQuiz(null);
        return;
      }

      const questionsSnap = await getDocs(collection(db, 'quizzes', id, 'questions'));
      const questions = questionsSnap.docs.map((d) => d.data() as QuizQuestion);

      setSearchedQuiz({
        id: quizSnap.id,
        subject: data.subject,
        attempts: data.attempts,
        score: data.score,
        timer: data.timer,
        createdAt: data.createdAt,
        published: true,
        questions,
        userId: data.userId,
        mentorName: data.mentorName || user?.displayName || 'Mentor',
      });
    } catch (error) {
      console.error(error);
      setSearchError('We could not find that quiz. Check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledQuizzes = useCallback(async () => {
    if (!studentId) return;
    setEnrolledError(null);
    try {
      const snapshot = await getDocs(collection(db, 'students', studentId, 'enrolledQuizzes'));
      const quizzes: EnrolledQuiz[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const quizDoc = await getDoc(doc(db, 'quizzes', data.quizId));
        if (!quizDoc.exists()) continue;

        const quizData = quizDoc.data();
        const questionsSnap = await getDocs(collection(db, 'quizzes', data.quizId, 'questions'));
        const questions: QuizQuestion[] = questionsSnap.docs.map((d) => {
          const q = d.data() || {};
          return {
            ...q,
            options: Array.isArray(q.options) ? q.options : [],
            correctOption: typeof q.correctOption === 'number' ? q.correctOption : 1,
            question: q.question || '',
          };
        });

        quizzes.push({
          id: quizDoc.id,
          subject: quizData.subject,
          attempts: quizData.attempts,
          score: quizData.score,
          timer: quizData.timer,
          createdAt: quizData.createdAt,
          published: true,
          questions,
          userId: quizData.userId,
          mentorName: data.mentorName,
        });
      }

      setEnrolledQuizzes(quizzes);
    } catch (error) {
      console.error('Error fetching enrolled quizzes:', error);
      setEnrolledError('We could not load your enrolled quizzes. Please try again.');
    }
  }, [studentId]);

  useEffect(() => {
    fetchEnrolledQuizzes();
  }, [fetchEnrolledQuizzes]);

  const enrollInQuiz = async (quiz: EnrolledQuiz) => {
    if (!studentId) return;
    try {
      await setDoc(doc(db, 'students', studentId, 'enrolledQuizzes', quiz.id), {
        quizId: quiz.id,
        subject: quiz.subject,
        userId: quiz.userId,
        mentorName: quiz.mentorName,
      });
      setSearchedQuiz(null);
      setQuizIdInput('');
      await fetchEnrolledQuizzes();
      setSuccess('You joined the quiz successfully.');
    } catch (error) {
      console.error('Error enrolling:', error);
      setSearchError('We could not join this quiz. Please try again.');
    }
  };

  const deleteEnrolledQuiz = async (quizId: string) => {
    if (!studentId) return;
    try {
      await deleteDoc(doc(db, 'students', studentId, 'enrolledQuizzes', quizId));
      await fetchEnrolledQuizzes();
      setSuccess('Quiz removed from your list.');
    } catch (error) {
      console.error('Error deleting enrolled quiz:', error);
      setEnrolledError('We could not remove this quiz. Please try again.');
    }
  };

  const handleQuizPress = (quiz: EnrolledQuiz) => {
    navigation.navigate('TakeQuiz', {
      quizId: quiz.id,
      subject: quiz.subject,
      questions: quiz.questions,
      studentId: studentId ?? '',
      allowedAttempts: quiz.attempts ?? 1,
      currentAttempts: 0,
      perQuestionTimer: quiz.timer,
      mentorName: quiz.mentorName,
      score: quiz.score,
    });
  };

  const handleSearchChange = (text: string) => {
    setQuizIdInput(text);
    if (text.length === 0) setSearchedQuiz(null);
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader first="Student" second=" Dashboard" />
        {success ? <SuccessState message={success} /> : null}

        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>🔍 Find Quiz</Text>
          <QuizSearchBox value={quizIdInput} onChange={handleSearchChange} onSearch={searchQuiz} />

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}

          {searchError ? <ErrorState message={searchError} onRetry={searchQuiz} /> : null}
          {searchedQuiz && <SearchResultCard quiz={searchedQuiz} onEnroll={enrollInQuiz} />}
        </View>

        <View style={styles.enrolledSection}>
          <Text style={styles.sectionTitle}>📚 My Quizzes</Text>
          {enrolledError ? (
            <ErrorState message={enrolledError} onRetry={fetchEnrolledQuizzes} />
          ) : enrolledQuizzes.length === 0 ? (
            <EmptyState
              icon="📖"
              title="No Quizzes Yet"
              message="Search and enroll in quizzes to get started!"
              iconSize={48}
              titleSize={18}
              paddingVertical={40}
            />
          ) : (
            <FlatList
              data={enrolledQuizzes}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <EnrolledQuizCard quiz={item} onPress={handleQuizPress} onRemove={deleteEnrolledQuiz} />
              )}
            />
          )}
        </View>
      </ScrollView>
      <MessageModal
        visible={notice !== null}
        title="Notice"
        message={notice ?? ''}
        tone="warning"
        onCancel={() => setNotice(null)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 20 },
  searchSection: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: width * 0.05, fontWeight: '700', color: colors.textDark, marginBottom: 16 },
  loading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  loadingText: { marginLeft: 8, color: colors.primary, fontSize: 14, fontWeight: '500' },
  enrolledSection: { paddingHorizontal: 20 },
});

export default StudentDashboardScreen;
