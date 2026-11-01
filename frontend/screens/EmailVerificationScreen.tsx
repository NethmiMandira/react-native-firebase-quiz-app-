import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ErrorState, MessageModal } from '../components/common';
import { getUserMessage } from '../utils/userMessage';
import type { ScreenProps } from '../type/navigation';

const EmailVerificationScreen: React.FC<ScreenProps<'EmailVerification'>> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;

  const [isSending, setIsSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ title: string; message: string; tone: 'success' | 'warning' } | null>(null);

  const checkEmailVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await user.reload();
        if (user.emailVerified) {
          setNotice({ title: 'Email verified', message: 'Your email has been verified successfully.', tone: 'success' });
          navigation.reset({ index: 0, routes: [{ name: 'DashboardScreen' }] });
        }
      } catch (verificationError) {
        console.error('Verification check error:', verificationError);
        setError('We could not check your verification status. Please try again.');
      }
    }
  };

  const resendVerificationEmail = async () => {
    setIsSending(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        setNotice({ title: 'Email sent', message: 'A new verification email has been sent.', tone: 'success' });
        setResendCooldown(60);
      } else {
        setNotice({ title: 'Already verified', message: 'Your email is already verified.', tone: 'warning' });
      }
    } catch (error: any) {
      console.error('Resend Error:', error);
      setError(getUserMessage(error, 'We could not send the verification email. Please try again.'));
    } finally {
      setIsSending(false);
    }
  };

  // Poll for verification every 10 seconds
  useEffect(() => {
    const interval = setInterval(checkEmailVerification, 10000);
    return () => clearInterval(interval);
  }, []);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>A verification link has been sent to:</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.note}>Please check your inbox and spam folder.</Text>
      {error ? <ErrorState message={error} onRetry={resendVerificationEmail} /> : null}
      <MessageModal
        visible={notice !== null}
        title={notice?.title ?? ''}
        message={notice?.message ?? ''}
        tone={notice?.tone}
        onCancel={() => setNotice(null)}
      />

      {isSending ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <TouchableOpacity
          style={[styles.button, resendCooldown > 0 ? styles.buttonDisabled : styles.buttonActive]}
          onPress={resendVerificationEmail}
          disabled={resendCooldown > 0}
        >
          <Text style={styles.buttonText}>
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Verification Email'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10, color: '#333', textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 5, color: '#555', textAlign: 'center' },
  email: { fontSize: 16, fontWeight: '600', marginBottom: 15, color: '#000', textAlign: 'center' },
  note: { fontSize: 14, color: '#777', marginBottom: 30, textAlign: 'center' },
  loader: { marginVertical: 20 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonActive: { backgroundColor: '#007bff' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default EmailVerificationScreen;