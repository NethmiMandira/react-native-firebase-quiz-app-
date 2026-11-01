import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateQuizId = (length = 6): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

export const checkQuizIdUnique = async (id: string): Promise<boolean> => {
  const snap = await getDoc(doc(db, 'quizzes', id));
  return !snap.exists();
};

/** Returns a unique quiz id, or null if none was found after `maxTries` retries. */
export const generateUniqueQuizId = async (maxTries = 5): Promise<string | null> => {
  let id = generateQuizId();
  let unique = await checkQuizIdUnique(id);
  let tries = 0;
  while (!unique && tries < maxTries) {
    id = generateQuizId();
    unique = await checkQuizIdUnique(id);
    tries++;
  }
  return unique ? id : null;
};
