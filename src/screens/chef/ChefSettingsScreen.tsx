import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useAuthStore } from '../../store';

export const ChefSettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
        },
      },
    ]);
  };

  const SettingItem = ({ icon, title, subtitle, onPress, showSwitch, switchValue }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={showSwitch}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={title === 'Notifications' ? () => setNotifications(!notifications) : () => setDarkMode(!darkMode)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.white}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsCard}>
            <SettingItem icon="notifications-outline" title="Notifications" subtitle="Receive order alerts" showSwitch switchValue={notifications} />
            <SettingItem icon="moon-outline" title="Dark Mode" subtitle="Coming soon" showSwitch switchValue={darkMode} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsCard}>
            <SettingItem icon="person-outline" title="Edit Profile" subtitle="Update your chef profile" onPress={() => {}} />
            <SettingItem icon="restaurant-outline" title="My Meals" subtitle="Manage your dishes" onPress={() => {}} />
            <SettingItem icon="wallet-outline" title="Earnings" subtitle="View your earnings" onPress={() => {}} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
            <SettingItem icon="help-circle-outline" title="Help & FAQ" onPress={() => {}} />
            <SettingItem icon="shield-checkmark-outline" title="Privacy Policy" onPress={() => {}} />
            <SettingItem icon="document-text-outline" title="Terms of Service" onPress={() => {}} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingsCard}>
            <SettingItem icon="information-circle-outline" title="App Version" subtitle="1.0.0" />
          </View>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  section: { marginBottom: spacing.lg },
  sectionTitle: { ...typography.caption, color: colors.textSecondary, marginLeft: spacing.lg, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 1 },
  settingsCard: { backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: borderRadius.md, overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  settingIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  settingContent: { flex: 1 },
  settingTitle: { ...typography.body, color: colors.text },
  settingSubtitle: { ...typography.caption, color: colors.textSecondary },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, marginHorizontal: spacing.lg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.xxl, gap: spacing.sm },
  logoutText: { ...typography.body, color: colors.error, fontWeight: '600' },
});
