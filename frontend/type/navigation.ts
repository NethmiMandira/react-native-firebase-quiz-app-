import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Quiz, QuizQuestion } from './quiz';

export type { Quiz, QuizQuestion } from './quiz';

export interface QuizFormParams {
  quizId: string;
  subject?: string;
  attempts?: number;
  questions?: number;
  score?: number;
  timer?: number;
  isEdit?: boolean;
}

export type RootStackParamList = {
  GetStarted: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  EmailVerification: { email: string };
  DashboardScreen: undefined;
  StudentDashboardScreen: undefined;
  MentorDashboardScreen: undefined;
  CreateQuiz: QuizFormParams;
  UpdateQuiz: QuizFormParams;
  QuizList: undefined;
  QuizDetails: { quizId: string; subject: string; quiz: Quiz };
  Question: { quizId: string; subject: string };
  QuestionList: { quizId: string; subject: string };
  UpdateQuestion: {
    quizId: string;
    questionId: string;
    question: string;
    options: string[];
    correctOption: number;
  };
  TakeQuiz: {
    quizId: string;
    subject: string;
    questions: QuizQuestion[];
    studentId: string;
    allowedAttempts?: number;
    currentAttempts?: number;
    perQuestionTimer?: number;
    mentorName: string;
    score?: number;
  };
  Settings: undefined;
  Help: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
