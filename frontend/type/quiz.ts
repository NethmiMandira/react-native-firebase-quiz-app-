export interface Quiz {
  id: string;
  subject: string;
  attempts?: number;
  questions?: number;
  score?: number;
  timer?: number;
  published?: boolean;
  addedQuestions?: number;
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctOption: number;
  scorePerQuestion?: number;
}

/** A question row as shown on the mentor's question list. */
export interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
}

/** A quiz as shown on the mentor dashboard. */
export interface MentorQuiz {
  id: string;
  subject: string;
  attempts?: number;
  questions?: number;
  score?: number;
  timer?: number;
  userId?: string;
  published: boolean;
  studentScores?: { attempts: number; score: number }[];
}

/** A quiz a student found / enrolled in. */
export interface EnrolledQuiz {
  id: string;
  subject: string;
  attempts?: number;
  score?: number;
  timer?: number;
  published: boolean;
  questions: QuizQuestion[];
  userId: string;
  mentorName: string;
}

export interface AttemptRecord {
  score: number;
  timestamp: number;
}
