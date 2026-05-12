import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Input, Button } from '../../components/ui';

export const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigation.reset({ index: 0, routes: [{ name: 'Auth', params: { screen: 'Login' } }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Create a new password for your account</Text>
      </View>
      <View style={styles.form}>
        <Input label="New Password" placeholder="Enter new password" leftIcon="lock-closed-outline" secureTextEntry value={form.password} onChangeText={(t) => setForm({ ...form, password: t })} error={errors.password} />
        <Input label="Confirm Password" placeholder="Confirm new password" leftIcon="lock-closed-outline" secureTextEntry value={form.confirmPassword} onChangeText={(t) => setForm({ ...form, confirmPassword: t })} error={errors.confirmPassword} />
      </View>
      <Button title="Reset Password" onPress={onSubmit} loading={isLoading} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: spacing.xxl },
  header: { marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary },
  form: { flex: 1 },
  button: { marginBottom: spacing.lg },
});
