import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../theme';
import { useAuthStore } from '../../store';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { hydrate, isOnboarded, isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    const initApp = async () => {
      await hydrate();
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!isOnboarded) {
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
      } else if (!isAuthenticated) {
        navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
      } else if (role === 'chef') {
        navigation.reset({ index: 0, routes: [{ name: 'Chef' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'User' }] });
      }
    };
    initApp();
  }, [isOnboarded, isAuthenticated, role]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MealApp</Text>
      <Text style={styles.subtitle}>Homemade meals from local chefs</Text>
      <ActivityIndicator size="large" color={colors.white} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.white,
    fontSize: 40,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
