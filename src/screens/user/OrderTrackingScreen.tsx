import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';
import { useOrdersStore } from '../../store';
import { UserStackParamList } from '../../navigation/types';
import { OrderStatus } from '../../types';

const STEPS: { status: OrderStatus; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { status: 'pending', label: 'Order Placed', icon: 'receipt-outline' },
  { status: 'accepted', label: 'Confirmed', icon: 'checkmark-circle-outline' },
  { status: 'preparing', label: 'Preparing', icon: 'restaurant-outline' },
  { status: 'out_for_delivery', label: 'On the Way', icon: 'bicycle-outline' },
  { status: 'delivered', label: 'Delivered', icon: 'home-outline' },
];

const getStatusIndex = (status: OrderStatus) => STEPS.findIndex((s) => s.status === status);

export const OrderTrackingScreen: React.FC = () => {
  const route = useRoute<RouteProp<UserStackParamList, 'OrderTracking'>>();
  const { orders } = useOrdersStore();
  const order = orders.find((o) => o.id === route.params.orderId);
  const currentIndex = order ? getStatusIndex(order.status) : 0;

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Order</Text>
        <Text style={styles.orderId}>Order #{order.id.slice(-6)}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.timeline}>
          {STEPS.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <View key={step.status} style={styles.step}>
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepIcon,
                      isCompleted && styles.stepIconActive,
                      isCurrent && styles.stepIconCurrent,
                    ]}
                  >
                    <Ionicons
                      name={step.icon}
                      size={20}
                      color={isCompleted ? colors.white : colors.textMuted}
                    />
                  </View>
                  {index < STEPS.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        isCompleted && styles.stepLineActive,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepLabel,
                      isCompleted && styles.stepLabelActive,
                      isCurrent && styles.stepLabelCurrent,
                    ]}
                  >
                    {step.label}
                  </Text>
                  {isCurrent && (
                    <Text style={styles.stepTime}>
                      {new Date().toLocaleTimeString()}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryItemName}>
                {item.quantity}x {item.meal.title}
              </Text>
              <Text style={styles.summaryItemPrice}>
                ${(item.meal.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Back to Home"
          onPress={() => {}}
          variant="outline"
          style={styles.footerBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  orderId: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  timeline: {
    paddingVertical: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    minHeight: 60,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepIconActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepIconCurrent: {
    borderColor: colors.warning,
    borderWidth: 2,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing.xs,
  },
  stepLabel: {
    ...typography.body,
    color: colors.textMuted,
  },
  stepLabelActive: {
    color: colors.text,
    fontWeight: '600',
  },
  stepLabelCurrent: {
    color: colors.primary,
  },
  stepTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryItemName: {
    ...typography.body,
    color: colors.text,
  },
  summaryItemPrice: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    ...typography.h4,
    color: colors.text,
  },
  totalValue: {
    ...typography.h4,
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
  },
  footerBtn: {
    width: '100%',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
