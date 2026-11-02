import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { EmptyState, ErrorState, LoadingState } from '../components/common';
import { QuizListItem } from '../components/quiz';
import { db } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';
import type { Quiz } from '../type/quiz';

const QuizListScreen: React.FC<ScreenProps<'QuizList'>> = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'quizzes'), where('published', '==', true));
      const snapshot = await getDocs(q);

      setQuizzes(
        snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            subject: data.subject || '',
            attempts: data.attempts || 0,
            questions: data.questions || 0,
            score: data.score || 0,
            timer: data.timer || 0,
            published: data.published ?? true,
            createdAt: data.createdAt,
          };
        }),
      );
    } catch (fetchError) {
      console.error('Error fetching quizzes:', fetchError);
      setError('We could not load published quizzes. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const onQuizPress = (quiz: Quiz) =>
    navigation.navigate('QuizDetails', { quizId: quiz.id, subject: quiz.subject, quiz });

  if (loading) {
    return <LoadingState message="Loading published quizzes..." />;
  }

  if (error) {
    return <ErrorState fullScreen message={error} onRetry={fetchQuizzes} />;
  }

  if (quizzes.length === 0) {
    return <EmptyState fullScreen icon="📚" message="No published quizzes are available yet." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuizListItem quiz={item} onPress={onQuizPress} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
});

export default QuizListScreen;
