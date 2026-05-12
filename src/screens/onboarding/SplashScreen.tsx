import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { useAuthStore } from '../../store';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { setOnboarded } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    };
    checkAuth();
  }, [navigation]);

  return <View style={[styles.container, { backgroundColor: colors.primary }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
