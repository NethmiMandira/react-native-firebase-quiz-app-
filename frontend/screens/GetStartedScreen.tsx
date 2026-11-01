import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthTitle, LearningIllustration } from '../components/auth';
import { PrimaryButton, ScreenContainer } from '../components/common';
import { colors } from '../theme/colors';
import { height, width } from '../theme/layout';
import type { ScreenProps } from '../type/navigation';

export default function GetStartedScreen({ navigation }: ScreenProps<'GetStarted'>) {
  return (
    <ScreenContainer>
      <View style={styles.mainContent}>
        <AuthTitle first="Smart" second="Quiz" fontSize={width * 0.13} letterSpacing={-1} marginBottom={40} />
        <LearningIllustration />
        <Text style={styles.description}>
          Master your subjects with SmartQuiz practice, learn, and succeed with quizzes tailored just for you!
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          label="Get Started"
          icon="🚀"
          fontSize={20}
          paddingVertical={20}
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  mainContent: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  description: {
    fontSize: 16,
    color: colors.textSoft,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  bottomSection: { paddingHorizontal: 20, paddingBottom: height * 0.12, alignItems: 'center' },
  button: { paddingHorizontal: 50, minWidth: width * 0.75 },
});

