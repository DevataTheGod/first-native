import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store';

export const ChefProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={styles.title}>Profile</Text></View>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Ionicons name="person" size={48} color={colors.textMuted} /></View>
          <Text style={styles.name}>{user?.name || 'Chef'}</Text>
          <View style={styles.ratingContainer}><Ionicons name="star" size={18} color={colors.warning} /><Text style={styles.rating}>4.8</Text><Text style={styles.reviews}>(124 reviews)</Text></View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statValue}>48</Text><Text style={styles.statLabel}>Orders</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>Meals</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>$1.2k</Text><Text style={styles.statLabel}>Earned</Text></View>
        </View>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}><Ionicons name="create-outline" size={24} color={colors.text} /><Text style={styles.menuText}>Edit Profile</Text><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}><Ionicons name="restaurant-outline" size={24} color={colors.text} /><Text style={styles.menuText}>My Meals</Text><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></TouchableOpacity>
        </View>
        <Button title="Logout" variant="outline" onPress={handleLogout} style={styles.logoutBtn} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  profileCard: { alignItems: 'center', padding: spacing.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { ...typography.body, fontWeight: '600', color: colors.text, marginLeft: spacing.xs },
  reviews: { ...typography.body, color: colors.textSecondary, marginLeft: spacing.xs },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: spacing.lg, marginHorizontal: spacing.lg, backgroundColor: colors.card, borderRadius: 12, marginBottom: spacing.lg },
  stat: { alignItems: 'center' },
  statValue: { ...typography.h3, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textSecondary },
  menuSection: { backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: 12, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { ...typography.body, color: colors.text, flex: 1, marginLeft: spacing.md },
  logoutBtn: { marginHorizontal: spacing.lg, marginTop: spacing.lg, marginBottom: spacing.xxl },
});
