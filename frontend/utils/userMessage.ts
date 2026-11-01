export function getUserMessage(error: unknown, fallback: string): string {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';

  const messages: Record<string, string> = {
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/user-not-found': 'The email or password is incorrect.',
    'auth/wrong-password': 'The email or password is incorrect.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
    'auth/network-request-failed': 'Please check your internet connection and try again.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  };

  return messages[code] || fallback;
}
