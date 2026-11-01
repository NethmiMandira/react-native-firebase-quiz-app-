import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthTitle } from '../components/auth';
import { ErrorState, FormInput, PrimaryButton, ScreenContainer, WarningState } from '../components/common';
import { auth } from '../config/firebase';
import { height, width } from '../theme/layout';
import { getUserMessage } from '../utils/userMessage';
import type { ScreenProps } from '../type/navigation';

const LoginScreen: React.FC<ScreenProps<'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleLogin = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      setWarning(null);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (userCredential.user.emailVerified) {
        navigation.navigate('DashboardScreen');
      } else {
        setWarning('Please verify your email before logging in.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login Error:', error.message);
        setError(getUserMessage(error, 'Unable to log in right now. Please try again.'));
      } else {
        console.error('Unknown Error:', error);
        setError('Unable to log in right now. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AuthTitle
          first="Welcome"
          second=" Back!"
          subtitle="Ready to continue your learning journey?"
          fontSize={width * 0.1}
          letterSpacing={-1}
          titleGap={12}
          marginBottom={height * 0.06}
        />

        <View style={styles.form}>
          <FormInput
            icon="📧"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            height={56}
            marginBottom={20}
          />
          <FormInput
            icon="🔒"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            height={56}
            marginBottom={20}
          />
          <PrimaryButton
            label={loading ? 'Logging in...' : 'Log In'}
            icon="🔑"
            fontSize={width * 0.045}
            style={styles.button}
            disabled={loading}
            onPress={handleLogin}
          />
          {error ? <ErrorState message={error} onRetry={handleLogin} /> : null}
          {warning ? <WarningState message={warning} /> : null}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  form: { width: '100%', alignItems: 'center' },
  button: { marginTop: 20, width: '80%', paddingHorizontal: 40 },
});

export default LoginScreen;