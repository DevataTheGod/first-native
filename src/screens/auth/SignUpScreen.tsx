import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Input, Button } from '../../components/ui';
import { useAuthStore } from '../../store';

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.phone.length < 10) newErrors.phone = 'Invalid phone number';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ name: form.name, email: form.email });
    setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>
      <View style={styles.form}>
        <Input label="Full Name" placeholder="Enter your name" leftIcon="person-outline" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} error={errors.name} />
        <Input label="Email" placeholder="Enter your email" leftIcon="mail-outline" value={form.email} onChangeText={(t) => setForm({ ...form, email: t })} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
        <Input label="Phone" placeholder="Enter your phone" leftIcon="call-outline" value={form.phone} onChangeText={(t) => setForm({ ...form, phone: t })} error={errors.phone} keyboardType="phone-pad" />
        <Input label="Password" placeholder="Create a password" leftIcon="lock-closed-outline" secureTextEntry value={form.password} onChangeText={(t) => setForm({ ...form, password: t })} error={errors.password} />
        <Input label="Confirm Password" placeholder="Confirm your password" leftIcon="lock-closed-outline" secureTextEntry value={form.confirmPassword} onChangeText={(t) => setForm({ ...form, confirmPassword: t })} error={errors.confirmPassword} />
      </View>
      <Button title="Sign Up" onPress={onSubmit} loading={isLoading} style={styles.button} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  header: { marginTop: spacing.xxl, marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary },
  form: { flex: 1 },
  button: { marginBottom: spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xxl },
  footerText: { ...typography.body, color: colors.textSecondary },
  signInText: { ...typography.body, color: colors.primary, fontWeight: '600' },
});
