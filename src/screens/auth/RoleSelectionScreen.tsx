import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store';

export const RoleSelectionScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { setRole } = useAuthStore();

  const handleSelectRole = (role: 'user' | 'chef') => {
    setRole(role);
    if (role === 'chef') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ChefDocuments' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'User' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join as Chef or User</Text>
        <Text style={styles.subtitle}>Choose how you want to use the app</Text>
      </View>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectRole('user')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={48} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>I'm a Food Lover</Text>
          <Text style={styles.cardDescription}>
            Browse meals, order from local chefs, and enjoy delicious food
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectRole('chef')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="restaurant" size={48} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>I'm a Chef</Text>
          <Text style={styles.cardDescription}>
            Share your cooking skills, receive orders, and earn money
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
