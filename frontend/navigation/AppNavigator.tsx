import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import GetStartedScreen from '../screens/GetStartedScreen';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import {
  CreateQuizScreen,
  DashboardScreen,
  EmailVerificationScreen,
  HelpScreen,
  MentorDashboardScreen,
  QuestionListScreen,
  QuestionScreen,
  QuizDetailsScreen,
  QuizListScreen,
  SettingsScreen,
  StudentDashboardScreen,
  TakeQuizScreen,
  UpdateQuestionScreen,
  UpdateQuizScreen,
} from '../screens';
import type { RootStackParamList } from '../type/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="GetStarted">
    {/* Onboarding & auth */}
    <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
    <Stack.Screen name="Signup" component= {SignupScreen} options={{ title: '' }} />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerificationScreen}
      options={{ headerShown: false }}
    />

    {/* Dashboards */}
    <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="StudentDashboardScreen"
      component={StudentDashboardScreen}
      options={{ title: 'Student' }}
    />
    <Stack.Screen
      name="MentorDashboardScreen"
      component={MentorDashboardScreen}
      options={{ headerShown: false }}
    />

    {/* Mentor: quizzes & questions */}
    <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} options={{ title: 'Create Quiz' }} />
    <Stack.Screen name="UpdateQuiz" component={UpdateQuizScreen} options={{ title: 'Edit Quiz' }} />
    <Stack.Screen name="QuizList" component={QuizListScreen} options={{ title: 'Quizzes' }} />
    <Stack.Screen name="QuizDetails" component={QuizDetailsScreen} options={{ title: 'Quiz Details' }} />
    <Stack.Screen name="Question" component={QuestionScreen} options={{ title: 'Add Question' }} />
    <Stack.Screen name="QuestionList" component={QuestionListScreen} options={{ title: 'Questions' }} />
    <Stack.Screen name="UpdateQuestion" component={UpdateQuestionScreen} options={{ title: 'Edit Question' }} />

    {/* Student: take a quiz */}
    <Stack.Screen name="TakeQuiz" component={TakeQuizScreen} options={{ title: 'Quiz' }} />

    {/* Misc */}
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

export default AppNavigator;