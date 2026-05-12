import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, ChefDocumentStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { UserNavigator } from './UserNavigator';
import { ChefNavigator } from './ChefNavigator';
import { ChefDocumentsNavigator } from './ChefDocumentsNavigator';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
import { colors } from '../theme';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <RootStack.Screen name="ChefDocuments" component={ChefDocumentsNavigator} />
      <RootStack.Screen name="User" component={UserNavigator} />
      <RootStack.Screen name="Chef" component={ChefNavigator} />
    </RootStack.Navigator>
  );
};
