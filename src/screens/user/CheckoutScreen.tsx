import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Input, Button } from '../../components/ui';
import { useCartStore, useOrdersStore } from '../../store';
import { calculateTotal, processPayment } from '../../services/paymentService';
import { PaymentMethod } from '../../types/payment';

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrdersStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ address: '', city: '', phone: '', notes: '', promoCode: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = getTotal();
  const total = calculateTotal(subtotal, form.promoCode);

  const applyPromoCode = () => {
    if (form.promoCode.toUpperCase() === 'FIRST10') {
      setPromoDiscount(subtotal * 0.1);
    } else {
      setPromoDiscount(0);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (form.phone.length < 10) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const paymentResult = await processPayment(paymentMethod, total);
    if (!paymentResult.success) {
      setIsLoading(false);
      return;
    }
    const order: any = {
      id: `order-${Date.now()}`,
      userId: 'user-1',
      chefId: items[0]?.meal.chefId || '',
      items,
      total,
      status: 'pending',
      deliveryAddress: `${form.address}, ${form.city}`,
      contactPhone: form.phone,
      createdAt: new Date().toISOString(),
      transactionId: paymentResult.transactionId,
    };
    addOrder(order);
    clearCart();
    setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'User', params: { screen: 'OrderTracking', params: { orderId: order.id } } }],
    });
  };

  const PaymentOption = ({ method, icon, label }: { method: PaymentMethod; icon: keyof typeof Ionicons.glyphMap; label: string }) => (
    <TouchableOpacity
      style={[styles.paymentOption, paymentMethod === method && styles.paymentOptionActive]}
      onPress={() => setPaymentMethod(method)}
    >
      <Ionicons name={icon} size={24} color={paymentMethod === method ? colors.primary : colors.textSecondary} />
      <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextActive]}>{label}</Text>
      {paymentMethod === method && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <Input label="Street Address" placeholder="Enter your address" leftIcon="location-outline" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} error={errors.address} />
          <Input label="City" placeholder="Enter your city" leftIcon="business-outline" value={form.city} onChangeText={(t) => setForm({ ...form, city: t })} error={errors.city} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Input label="Phone Number" placeholder="Enter your phone" leftIcon="call-outline" value={form.phone} onChangeText={(t) => setForm({ ...form, phone: t })} error={errors.phone} keyboardType="phone-pad" />
          <Input label="Delivery Notes (Optional)" placeholder="Any special instructions?" leftIcon="document-text-outline" value={form.notes} onChangeText={(t) => setForm({ ...form, notes: t })} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <PaymentOption method="cash" icon="cash-outline" label="Cash on Delivery" />
          <PaymentOption method="card" icon="card-outline" label="Credit/Debit Card" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <View style={styles.promoInput}>
              <Input label="" placeholder="Enter promo code" value={form.promoCode} onChangeText={(t) => setForm({ ...form, promoCode: t })} />
            </View>
            <TouchableOpacity style={styles.applyBtn} onPress={applyPromoCode}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery Fee</Text><Text style={styles.summaryValue}>$2.99</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service Fee</Text><Text style={styles.summaryValue}>$0.50</Text></View>
          {promoDiscount > 0 && <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Discount</Text><Text style={[styles.summaryValue, { color: colors.success }]}>-${promoDiscount.toFixed(2)}</Text></View>}
          <View style={styles.divider} />
          <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${total.toFixed(2)}</Text></View>
        </View>
      </ScrollView>
      <View style={styles.footer}><Button title={`Pay $${total.toFixed(2)}`} onPress={onSubmit} loading={isLoading} style={styles.button} /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  paymentOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm, borderWidth: 2, borderColor: 'transparent' },
  paymentOptionActive: { borderColor: colors.primary },
  paymentText: { ...typography.body, color: colors.text, flex: 1, marginLeft: spacing.md },
  paymentTextActive: { color: colors.primary, fontWeight: '600' },
  promoRow: { flexDirection: 'row', gap: spacing.sm },
  promoInput: { flex: 1 },
  applyBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, borderRadius: borderRadius.md, justifyContent: 'center' },
  applyText: { ...typography.button, color: colors.white },
  summary: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.xl },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryLabel: { ...typography.body, color: colors.textSecondary },
  summaryValue: { ...typography.body, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  totalLabel: { ...typography.h4, color: colors.text },
  totalValue: { ...typography.h4, color: colors.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
