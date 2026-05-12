import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useAuthStore } from '../../store';
import { useMealsStore } from '../../store';

export const ChefProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();
  const { meals } = useMealsStore();

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  const stats = [
    { label: 'Total Meals', value: meals.length },
    { label: 'Orders', value: 48 },
    { label: 'Rating', value: '4.8 ⭐' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.name}>{user?.name || 'Chef'}</Text>
          <Text style={styles.email}>{user?.email || 'chef@example.com'}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.verifiedText}>Verified Chef</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Ionicons name="create-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddMeal' as never)}>
            <Ionicons name="add-circle-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Add New Meal</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Ratings' as never)}>
            <Ionicons name="star-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Ratings & Reviews</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Ionicons name="analytics-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Analytics</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('settings' as never)}>
            <Ionicons name="settings-outline" size={22} color={colors.text} />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  profileCard: { alignItems: 'center', padding: spacing.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  email: { ...typography.body, color: colors.textSecondary },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: 4 },
  verifiedText: { ...typography.caption, color: colors.success, fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: spacing.lg, marginHorizontal: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.md, marginBottom: spacing.lg },
  statItem: { alignItems: 'center' },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textSecondary },
  menuSection: { backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: borderRadius.md, overflow: 'hidden', marginBottom: spacing.lg },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { ...typography.body, color: colors.text, flex: 1, marginLeft: spacing.md },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, marginHorizontal: spacing.lg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.xxl, gap: spacing.sm },
  logoutText: { ...typography.body, color: colors.error, fontWeight: '600' },
});
