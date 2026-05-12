import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
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
  { status: 'delivered', label: 'Delivered', icon: 'checkmark-done-outline' },
];

const getStatusIndex = (status: OrderStatus) => STEPS.findIndex((s) => s.status === status);

export const OrderTrackingScreen: React.FC = () => {
  const route = useRoute<RouteProp<UserStackParamList, 'OrderTracking'>>();
  const navigation = useNavigation<any>();
  const { orders } = useOrdersStore();
  const order = orders.find((o) => o.id === route.params?.orderId);
  const currentIndex = order ? getStatusIndex(order.status) : -1;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Track Order</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
          <Text style={styles.errorText}>Order not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { orderId: order.id })}>
          <Ionicons name="chatbubbles-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{order.id.slice(-6)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const pulseAnim = React.useRef(new Animated.Value(1)).current;

          useEffect(() => {
            if (isCurrent) {
              Animated.loop(
                Animated.sequence([
                  Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
                  Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                ])
              ).start();
            }
          }, [isCurrent]);

          return (
            <View key={step.status} style={styles.step}>
              <View style={styles.stepLeft}>
                <Animated.View
                  style={[
                    styles.stepIcon,
                    isCompleted && styles.stepIconActive,
                    isCurrent && styles.stepIconCurrent,
                    isCurrent && { transform: [{ scale: pulseAnim }] },
                  ]}
                >
                  <Ionicons
                    name={step.icon}
                    size={20}
                    color={isCompleted ? colors.white : colors.textMuted}
                  />
                </Animated.View>
                {index < STEPS.length - 1 && (
                  <View style={[styles.stepLine, isCompleted && styles.stepLineActive]} />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepLabel, isCompleted && styles.stepLabelActive, isCurrent && styles.stepLabelCurrent]}>
                  {step.label}
                </Text>
                {isCurrent && (
                  <Text style={styles.stepTime}>Active now</Text>
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
            <Text style={styles.summaryItemName}>{item.quantity}x {item.meal.title}</Text>
            <Text style={styles.summaryItemPrice}>${(item.meal.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryTotal}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="View Order History"
          variant="outline"
          onPress={() => navigation.navigate('OrderHistory')}
          style={styles.footerBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return colors.warning;
    case 'accepted':
    case 'preparing': return colors.primary;
    case 'out_for_delivery': return colors.secondary;
    case 'delivered': return colors.success;
    case 'cancelled': return colors.error;
    default: return colors.textMuted;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  orderInfo: { alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  orderId: { ...typography.body, color: colors.textSecondary },
  statusBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, marginTop: spacing.xs },
  statusText: { ...typography.bodySmall, color: colors.white, fontWeight: '600', textTransform: 'capitalize' },
  timeline: { flex: 1, paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  step: { flexDirection: 'row', minHeight: 70 },
  stepLeft: { alignItems: 'center', marginRight: spacing.md },
  stepIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border },
  stepIconActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepIconCurrent: { borderColor: colors.warning, borderWidth: 3 },
  stepLine: { width: 3, flex: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  stepLineActive: { backgroundColor: colors.primary },
  stepContent: { flex: 1, paddingTop: spacing.xs },
  stepLabel: { ...typography.body, color: colors.textMuted },
  stepLabelActive: { color: colors.text, fontWeight: '600' },
  stepLabelCurrent: { color: colors.primary },
  stepTime: { ...typography.caption, color: colors.primary, marginTop: spacing.xs },
  summaryCard: { backgroundColor: colors.card, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  summaryTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryItemName: { ...typography.body, color: colors.text },
  summaryItemPrice: { ...typography.body, color: colors.textSecondary },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  summaryTotal: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { ...typography.h4, color: colors.text },
  totalValue: { ...typography.h4, color: colors.primary },
  footer: { padding: spacing.lg },
  footerBtn: { width: '100%' },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { ...typography.body, color: colors.error, marginTop: spacing.md },
});
