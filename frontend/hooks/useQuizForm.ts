import { useState } from 'react';

export interface QuizFormValues {
  subject: string;
  attempts: string;
  questions: string;
  score: string;
  timer: number;
}

interface InitialQuiz {
  subject?: string;
  attempts?: number;
  questions?: number;
  score?: number;
  timer?: number;
}

export function useQuizForm(initial: InitialQuiz = {}) {
  const [values, setValues] = useState<QuizFormValues>({
    subject: initial.subject || '',
    attempts: initial.attempts?.toString() || '',
    questions: initial.questions?.toString() || '',
    score: initial.score?.toString() || '',
    timer: initial.timer || 0,
  });

  const setField = <K extends keyof QuizFormValues>(key: K, value: QuizFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const isFormValid =
    values.subject.trim() !== '' &&
    parseInt(values.attempts, 10) > 0 &&
    parseInt(values.questions, 10) > 0 &&
    parseInt(values.score, 10) > 0;

  /** Returns an error message, or null when the form is valid. */
  const validate = (): string | null => {
    if (!values.subject.trim()) return 'Subject is required';
    if (!values.attempts || parseInt(values.attempts, 10) <= 0)
      return 'Number of attempts must be greater than 0';
    if (!values.questions || parseInt(values.questions, 10) <= 0)
      return 'Number of questions must be greater than 0';
    if (!values.score || parseInt(values.score, 10) <= 0)
      return 'Score per question must be greater than 0';
    return null;
  };

  const toPayload = () => ({
    subject: values.subject.trim(),
    attempts: parseInt(values.attempts, 10),
    questions: parseInt(values.questions, 10),
    score: parseInt(values.score, 10),
    timer: values.timer,
  });

  return { values, setField, isFormValid, validate, toPayload };
}
