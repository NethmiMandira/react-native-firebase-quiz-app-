import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EmptyState, ErrorState, LoadingState, MessageModal, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import {
  DashboardTab,
  DashboardTabs,
  FloatingCreateButton,
  MenuButton,
  MentorMenuModal,
  MentorMenuOption,
  MentorQuizCard,
} from '../components/dashboard';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';
import type { MentorQuiz } from '../type/quiz';
import { isPublished } from '../utils/quiz';

const MentorDashboardScreen: React.FC<ScreenProps<'MentorDashboardScreen'>> = ({ navigation }) => {
  const [mentorName, setMentorName] = useState('Guest');
  const [publishedQuizzes, setPublishedQuizzes] = useState<MentorQuiz[]>([]);
  const [unpublishedQuizzes, setUnpublishedQuizzes] = useState<MentorQuiz[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('published');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const user = auth.currentUser;
  const userId = user?.uid;

  const fetchQuizzes = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'quizzes'), where('userId', '==', userId));
      const snapshot = await getDocs(q);

      const allQuizzes: MentorQuiz[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const attemptsSnapshot = await getDocs(
            collection(db, 'quizzes', docSnap.id, 'studentAttempts'),
          );
          const studentScores = attemptsSnapshot.docs.map((d) => ({
            attempts: d.data().attempts ?? 0,
            score: d.data().score ?? 0,
          }));

          return {
            id: docSnap.id,
            subject: data.subject,
            attempts: data.attempts,
            questions: data.questions,
            score: data.score,
            timer: data.timer,
            createdAt: data.createdAt,
            userId: data.userId,
            published: isPublished(data.published),
            studentScores,
          };
        }),
      );

      setPublishedQuizzes(allQuizzes.filter((q) => q.published));
      setUnpublishedQuizzes(allQuizzes.filter((q) => !q.published));
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError('We could not load your quizzes. Check your connection and try again.');
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (user?.displayName) setMentorName(user.displayName);
    fetchQuizzes();
  }, [userId, fetchQuizzes]);

  // Close the menu on Android back press instead of leaving the screen
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (menuVisible) {
        setMenuVisible(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [menuVisible]);

  const handleMenuOption = (option: MentorMenuOption) => {
    setMenuVisible(false);
    if (option === 'Quizzes') {
      navigation.navigate('CreateQuiz', { quizId: 'temp-id', subject: 'Choose Subject', isEdit: false });
    } else if (option === 'Settings') {
      navigation.navigate('Settings');
    } else if (option === 'Help') {
      navigation.navigate('Help');
    }
  };

  const handleQuizPress = (quiz: MentorQuiz) => {
    navigation.navigate('QuizDetails', {
      quizId: quiz.id,
      subject: quiz.subject,
      quiz: {
        id: quiz.id,
        subject: quiz.subject,
        attempts: quiz.attempts,
        questions: quiz.questions,
        score: quiz.score,
        timer: quiz.timer,
        published: quiz.published,
        addedQuestions: 0,
      },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchQuizzes();
    setRefreshing(false);
  };

  const deleteQuiz = (quizId: string) => {
    setDeleteId(quizId);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    try {
      await deleteDoc(doc(db, 'quizzes', id));
      await fetchQuizzes();
      setActionMessage('Quiz deleted successfully.');
    } catch (error) {
      console.warn('Quiz deletion failed.');
      setError(null);
      setTimeout(() => {
        setError('We could not delete this quiz. Please try again.');
      }, 0);
    }
  };

  const currentQuizzes = (activeTab === 'published' ? publishedQuizzes : unpublishedQuizzes).filter(
    (q) => typeof q.id === 'string' && typeof q.subject === 'string',
  );

  return (
    <GestureHandlerRootView style={styles.flex}>
      <ScreenContainer>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ScreenHeader
            first="Mentor"
            second=" Dashboard"
            subtitle="Manage your quizzes"
            right={<MenuButton onPress={() => setMenuVisible(true)} />}
          />

          <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />
          {actionMessage ? <SuccessState message={actionMessage} /> : null}

          <View style={styles.content}>
            {loading ? (
              <LoadingState message="Loading quizzes..." fullScreen={false} />
            ) : error ? (
              <ErrorState message={error} onRetry={fetchQuizzes} />
            ) : currentQuizzes.length === 0 ? (
              <EmptyState
                icon={activeTab === 'published' ? '📚' : '📝'}
                title={activeTab === 'published' ? 'No Published Quizzes' : 'No Draft Quizzes'}
                message={
                  activeTab === 'published'
                    ? 'Publish your quizzes to make them available to students!'
                    : 'Create your first quiz to get started!'
                }
              />
            ) : (
              <FlatList
                data={currentQuizzes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MentorQuizCard
                    quiz={item}
                    mentorName={mentorName}
                    onPress={handleQuizPress}
                    onDelete={deleteQuiz}
                  />
                )}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>

        <FloatingCreateButton
          onPress={() => navigation.navigate('CreateQuiz', { quizId: 'new', subject: '', isEdit: false })}
        />

        <MentorMenuModal
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onSelect={handleMenuOption}
        />
        <MessageModal
          visible={deleteId !== null}
          title="Delete quiz?"
          message="This action cannot be undone. Are you sure you want to delete this quiz?"
          tone="error"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      </ScreenContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollView: { flex: 1, zIndex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
});

export default MentorDashboardScreen;
