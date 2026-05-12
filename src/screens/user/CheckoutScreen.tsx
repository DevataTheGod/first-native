import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { Input, Button } from '../../components/ui';

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items, getTotal, clearCart } = require('../../store').useCartStore();
  const { addOrder } = require('../../store').useOrdersStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = useState({ address: '', city: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    const order = {
      id: `order-${Date.now()}`,
      userId: 'user-1',
      chefId: items[0]?.meal.chefId || '',
      items,
      total: getTotal() + 2.99,
      status: 'pending',
      deliveryAddress: `${form.address}, ${form.city}`,
      contactPhone: form.phone,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'User', params: { screen: 'OrderTracking' } }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 40 }} />
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
          <View style={styles.paymentOption}>
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </View>
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${getTotal().toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery Fee</Text><Text style={styles.summaryValue}>$2.99</Text></View>
          <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${(getTotal() + 2.99).toFixed(2)}</Text></View>
        </View>
      </ScrollView>
      <View style={styles.footer}><Button title="Confirm Order" onPress={onSubmit} loading={isLoading} style={styles.button} /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backText: { ...typography.body, color: colors.primary },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  paymentOption: { backgroundColor: colors.card, padding: spacing.md, borderRadius: 12 },
  paymentText: { ...typography.body, color: colors.text },
  summary: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: 12, marginBottom: spacing.xl },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryLabel: { ...typography.body, color: colors.textSecondary },
  summaryValue: { ...typography.body, color: colors.text },
  totalLabel: { ...typography.h4, color: colors.text },
  totalValue: { ...typography.h4, color: colors.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
