import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthTitle, BackButton } from '../components/auth';
import { PrimaryButton, ScreenContainer } from '../components/common';
import { colors } from '../theme/colors';
import { height, width } from '../theme/layout';
import type { ScreenProps } from '../type/navigation';

export default function AuthScreen({ navigation }: ScreenProps<'Auth'>) {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.content}>
        <AuthTitle
          first="Smart"
          second="Quiz"
          subtitle="Choose an option to continue"
          fontSize={width * 0.13}
          subtitleSize={width * 0.045}
          letterSpacing={-1}
          titleGap={height * 0.02}
          marginBottom={height * 0.08}
        />

        <View style={styles.options}>
          <PrimaryButton
            label="Login"
            icon="🔑"
            fontSize={width * 0.05}
            paddingVertical={20}
            style={styles.optionButton}
            onPress={() => navigation.navigate('Login')}
          />
          <PrimaryButton
            label="Sign Up"
            icon="✨"
            color={colors.secondary}
            fontSize={width * 0.05}
            paddingVertical={20}
            style={styles.optionButton}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>

        <View style={styles.decoration}>
          <View style={styles.dotLarge} />
          <View style={styles.dotSmall} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: height * 0.02,
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  options: { width: '100%', alignItems: 'center' },
  optionButton: { width: '80%', marginBottom: height * 0.03 },
  decoration: { position: 'absolute', bottom: height * 0.05, width: '100%', alignItems: 'center' },
  dotLarge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(116, 97, 238, 0.3)',
    marginBottom: 8,
  },
  dotSmall: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255, 107, 107, 0.3)' },
});
