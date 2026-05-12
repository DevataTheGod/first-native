import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store';

export const ProfileScreen: React.FC = () => {
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
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Profile</Text></View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Ionicons name="person" size={48} color={colors.textMuted} /></View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}><Ionicons name="person-outline" size={24} color={colors.text} /><Text style={styles.menuText}>Edit Profile</Text><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Ionicons name="heart-outline" size={24} color={colors.text} /><Text style={styles.menuText}>Favorites</Text><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}><Ionicons name="settings-outline" size={24} color={colors.text} /><Text style={styles.menuText}>Settings</Text><Ionicons name="chevron-forward" size={20} color={colors.textMuted} /></TouchableOpacity>
      </View>
      <Button title="Logout" variant="outline" onPress={handleLogout} style={styles.logoutBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  profileCard: { alignItems: 'center', padding: spacing.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  name: { ...typography.h3, color: colors.text, marginBottom: spacing.xs },
  email: { ...typography.body, color: colors.textSecondary },
  menuSection: { backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: 12, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { ...typography.body, color: colors.text, flex: 1, marginLeft: spacing.md },
  logoutBtn: { marginHorizontal: spacing.lg, marginTop: spacing.lg },
});
