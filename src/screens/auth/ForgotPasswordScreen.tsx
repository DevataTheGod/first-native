import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Input, Button } from '../../components/ui';
export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    setError('');
    if (method === 'email' && !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (method === 'phone' && phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigation.navigate('OTPVerification', { email: method === 'email' ? email : undefined, phone: method === 'phone' ? phone : undefined });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Select how you want to receive your verification code
        </Text>
      </View>
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[styles.methodBtn, method === 'email' && styles.methodActive]}
          onPress={() => setMethod('email')}
        >
          <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>
            Via Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodBtn, method === 'phone' && styles.methodActive]}
          onPress={() => setMethod('phone')}
        >
          <Text style={[styles.methodText, method === 'phone' && styles.methodTextActive]}>
            Via SMS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        {method === 'email' ? (
          <Input
            label="Email Address"
            placeholder="Enter your email"
            leftIcon="mail-outline"
            value={email}
            onChangeText={setEmail}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        ) : (
          <Input
            label="Phone Number"
            placeholder="Enter your phone"
            leftIcon="call-outline"
            value={phone}
            onChangeText={setPhone}
            error={error}
            keyboardType="phone-pad"
          />
        )}
      </View>
      <Button
        title="Continue"
        onPress={handleContinue}
        loading={isLoading}
        style={styles.button}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Sign In</Text>
      </TouchableOpacity>
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
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  methodContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  methodBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    borderRadius: 12,
  },
  methodActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  methodText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  methodTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  form: {
    marginBottom: spacing.lg,
  },
  button: {
    marginBottom: spacing.lg,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
  },
});
