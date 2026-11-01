import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AuthTitle } from '../components/auth';
import { ErrorState, FormInput, PrimaryButton, ScreenContainer, WarningState } from '../components/common';
import { height, width } from '../theme/layout';
import type { ScreenProps } from '../type/navigation';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserMessage } from '../utils/userMessage';

const SignupScreen: React.FC<ScreenProps<'Signup'>> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleSignup = async () => {
    if (loading) return;
    console.log('1. handleSignup called successfully');

    if (!email || !password || !firstName || !lastName) {
      setWarning('Please complete all fields before creating your account.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setWarning(null);
      console.log('2. Attempting to create user with Firebase...');
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      console.log('3. User created successfully:', userCredential.user.uid);
      
      await updateProfile(userCredential.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });
      console.log('4. Display name updated successfully');

      await sendEmailVerification(userCredential.user);
      console.log('5. Verification email sent successfully');

      navigation.navigate('EmailVerification', { email: email.trim() });
    } catch (error: any) {
      console.log('--- SIGNUP ERROR ---');
      console.log('Message:', error?.message);
      console.log('Code:', error?.code);
      console.log('Full Error:', JSON.stringify(error, null, 2));

      setError(getUserMessage(error, 'Unable to create your account. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <AuthTitle
            first="Create"
            second=" Account"
            subtitle="Join SmartQuiz and start your learning adventure!"
            fontSize={width * 0.08}
            subtitleSize={width * 0.038}
            marginBottom={height * 0.04}
          />

          <View style={styles.form}>
            <FormInput icon="👤" placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <FormInput icon="👤" placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <FormInput
              icon="📧"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput
              icon="🔒"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <PrimaryButton
              label={loading ? 'Creating account...' : 'Sign Up'}
              icon="✨"
              color="#FF6B6B"
              paddingVertical={16}
              fontSize={width * 0.045}
              style={styles.button}
              disabled={loading}
              onPress={handleSignup}
            />
            {error ? <ErrorState message={error} onRetry={handleSignup} /> : null}
            {warning ? <WarningState message={warning} /> : null}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: height * 0.05, zIndex: 1 },
  content: { paddingHorizontal: 20, alignItems: 'center' },
  form: { width: '100%', alignItems: 'center' },
  button: { marginTop: 16, width: '80%', paddingHorizontal: 40 },
});

export default SignupScreen;