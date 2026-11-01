import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { EmptyState, ErrorState, LoadingState, MessageModal, PrimaryButton, ScreenContainer, ScreenHeader, SuccessState } from '../components/common';
import { QuestionCard } from '../components/question';
import { colors } from '../theme/colors';
import { db } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';
import type { QuestionData } from '../type/quiz';

const QuestionListScreen: React.FC<ScreenProps<'QuestionList'>> = ({ route, navigation }) => {
  const { quizId, subject } = route.params;

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [maxQuestions, setMaxQuestions] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const snapshot = await getDocs(collection(db, 'quizzes', quizId, 'questions'));
      setQuestions(
        snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            question: data.question || 'Untitled',
            options: data.options || [],
            correctOption: data.correctOption ?? -1,
          };
        }),
      );
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('We could not load this quiz’s questions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const fetchQuizStatus = useCallback(async () => {
    try {
      const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
      if (quizDoc.exists()) {
        setIsPublished(!!quizDoc.data().published);
        setMaxQuestions(quizDoc.data().questions ?? null);
      }
    } catch (error) {
      console.error('Error fetching quiz status:', error);
      setError('We could not load the quiz status. Please try again.');
    }
  }, [quizId]);

  // Load on mount and refresh whenever the screen regains focus (after edits)
  useEffect(() => {
    fetchQuestions();
    fetchQuizStatus();
    return navigation.addListener('focus', () => {
      fetchQuestions();
      setMenuOpenId(null);
    });
  }, [navigation, fetchQuestions, fetchQuizStatus]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    try {
      await deleteDoc(doc(db, 'quizzes', quizId, 'questions', id));
      setSuccess('Question deleted successfully.');
      setMenuOpenId(null);
      fetchQuestions();
    } catch (error) {
      console.error('Delete error:', error);
      setError('We could not delete this question. Please try again.');
    }
  };

  const handleEdit = (q: QuestionData) =>
    navigation.navigate('UpdateQuestion', {
      quizId,
      questionId: q.id,
      question: q.question,
      options: q.options,
      correctOption: q.correctOption,
    });

  const canAddQuestion = !isPublished && (maxQuestions === null || questions.length < maxQuestions);
  const goAdd = () => navigation.navigate('Question', { quizId, subject });

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingState message="Loading questions..." />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <ErrorState fullScreen message={error} onRetry={fetchQuestions} />
      </ScreenContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <ScreenContainer>
        <EmptyState
          fullScreen
          icon="📝"
          title="No Questions Yet"
          titleSize={24}
          message="Start building your quiz by adding some questions!"
        >
          <PrimaryButton
            label="Add First Question"
            icon="➕"
            paddingVertical={16}
            fontSize={16}
            disabled={!canAddQuestion}
            style={styles.emptyButton}
            onPress={goAdd}
          />
        </EmptyState>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          first="Quiz"
          second=" Questions"
          subtitle={`${questions.length} question${questions.length !== 1 ? 's' : ''} for ${subject}`}
        />
        {success ? <SuccessState message={success} /> : null}

        {questions.map((q, index) => (
          <QuestionCard
            key={q.id}
            index={index}
            data={q}
            menuOpen={menuOpenId === q.id}
            editable={!isPublished}
            onToggleMenu={() => setMenuOpenId(menuOpenId === q.id ? null : q.id)}
            onEdit={() => handleEdit(q)}
            onDelete={() => handleDelete(q.id)}
          />
        ))}

        <PrimaryButton
          label="Add Another Question"
          icon="➕"
          color={colors.secondary}
          paddingVertical={16}
          fontSize={16}
          disabled={!canAddQuestion}
          style={styles.addButton}
          onPress={goAdd}
        />
      </ScrollView>
      <MessageModal
        visible={deleteId !== null}
        title="Delete question?"
        message="This action cannot be undone. Are you sure you want to delete this question?"
        tone="error"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, zIndex: 1 },
  scrollContent: { paddingBottom: 30 },
  emptyButton: { paddingHorizontal: 32, marginTop: 16 },
  addButton: { marginHorizontal: 20, marginTop: 8 },
});

export default QuestionListScreen;
