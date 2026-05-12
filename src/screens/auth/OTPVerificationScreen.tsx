import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Button } from '../../components/ui';

export const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      // Focus next input
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete code');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigation.navigate('ResetPassword', { email: route.params?.email });
  };

  const handleResend = () => {
    setError('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{' '}
          <Text style={styles.highlight}>
            {route.params?.email || route.params?.phone}
          </Text>
        </Text>
      </View>
      <View style={styles.otpContainer}>
        <View style={styles.otpInputs}>
          {otp.map((digit, index) => (
            <View key={index} style={[styles.otpBox, error && styles.otpBoxError]}>
              <Text style={styles.otpText}>{digit}</Text>
            </View>
          ))}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <Button
        title="Verify"
        onPress={handleVerify}
        loading={isLoading}
        disabled={otp.join('').length !== 6}
        style={styles.button}
      />
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code? </Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendLink}>Resend</Text>
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
  highlight: {
    color: colors.primary,
    fontWeight: '600',
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
  },
  otpBoxError: {
    borderColor: colors.error,
  },
  otpText: {
    ...typography.h3,
    color: colors.text,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.md,
  },
  button: {
    marginBottom: spacing.lg,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  resendLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
