import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorState, GradientTitle, ScreenContainer } from '../components/common';
import { RoleCard } from '../components/dashboard';
import { colors } from '../theme/colors';
import { height, width } from '../theme/layout';
import { auth } from '../config/firebase';
import type { ScreenProps } from '../type/navigation';

export default function DashboardScreen({ navigation }: ScreenProps<'DashboardScreen'>) {
  const user = auth.currentUser;

  if (!user) {
    return (
      <ScreenContainer>
        <ErrorState
          fullScreen
          title="Session expired"
          message="Please log in again to continue to your dashboard."
          retryLabel="Go to Login"
          onRetry={() => navigation.navigate('Login')}
        />
      </ScreenContainer>
    );
  }

  const firstName = user.displayName?.split(' ')[0] || 'there';

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.greeting}>
          <GradientTitle first="Hi," second={` ${firstName}!`} />
        </View>

        <View style={styles.titleContainer}>
          <GradientTitle
            first="Who"
            second=" are you?"
            secondColor={colors.primary}
            align="center"
            fontSize={width * 0.07}
            style={styles.title}
          />
          <Text style={styles.subtitle}>Select the one which suits your needs</Text>
        </View>

        <View style={styles.roles}>
          <RoleCard
            icon="🎓"
            title="Student"
            description="Learn and practice with quizzes"
            accentColor={colors.primary}
            marginBottom={20}
            onPress={() => navigation.navigate('StudentDashboardScreen')}
          />
          <RoleCard
            icon="👨‍🏫"
            title="Mentor"
            description="Create and manage quizzes"
            accentColor={colors.secondary}
            onPress={() => navigation.navigate('MentorDashboardScreen')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: height * 0.08, zIndex: 1 },
  greeting: { alignItems: 'flex-start', marginBottom: height * 0.08 },
  titleContainer: { alignItems: 'center', marginBottom: height * 0.06 },
  title: { marginBottom: 8 },
  subtitle: { fontSize: width * 0.04, color: colors.textSoft, textAlign: 'center' },
  roles: { alignItems: 'center', width: '100%' },
});