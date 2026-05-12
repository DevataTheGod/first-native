import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../theme';
import { MealCard, EmptyState } from '../../components/ui';
import { useMealsStore } from '../../store';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items, updateQuantity, removeItem, getTotal } = require('../../store').useCartStore();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}><Text style={styles.title}>Cart</Text></View>
        <EmptyState icon="cart-outline" title="Your Cart is Empty" description="Add meals to your cart to order" actionLabel="Browse Meals" onAction={() => {}} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>Cart ({items.length})</Text></View>
      <FlatList data={items} keyExtractor={(item: any) => item.meal.id} contentContainerStyle={styles.list} renderItem={({ item }: any) => (
        <View style={styles.cartItem}>
          <View style={styles.itemImage}><Text style={styles.itemEmoji}>🍽️</Text></View>
          <View style={styles.itemInfo}><Text style={styles.itemTitle}>{item.meal.title}</Text><Text style={styles.itemChef}>by {item.meal.chefName}</Text><Text style={styles.itemPrice}>${item.meal.price.toFixed(2)}</Text></View>
          <View style={styles.itemActions}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.meal.id, item.quantity - 1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.meal.id, item.quantity + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.meal.id)}><Text style={styles.removeText}>🗑️</Text></TouchableOpacity>
          </View>
        </View>
      )} />
      <View style={styles.footer}>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Subtotal</Text><Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text></View>
        <View style={styles.totalRow}><Text style={styles.totalLabel}>Delivery</Text><Text style={styles.totalValue}>$2.99</Text></View>
        <View style={[styles.totalRow, styles.grandTotal]}><Text style={styles.grandTotalLabel}>Total</Text><Text style={styles.grandTotalValue}>${(getTotal() + 2.99).toFixed(2)}</Text></View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('User', { screen: 'Checkout' })}><Text style={styles.checkoutText}>Proceed to Checkout</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  cartItem: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  itemImage: { width: 70, height: 70, borderRadius: 8, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  itemEmoji: { fontSize: 32 },
  itemInfo: { flex: 1, marginLeft: spacing.md },
  itemTitle: { ...typography.bodySmall, fontWeight: '600', color: colors.text },
  itemChef: { ...typography.caption, color: colors.textSecondary },
  itemPrice: { ...typography.body, fontWeight: '600', color: colors.primary, marginTop: spacing.xs },
  itemActions: { alignItems: 'flex-end', justifyContent: 'space-between' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 28, height: 28, borderRadius: 6, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  quantity: { ...typography.body, fontWeight: '600', marginHorizontal: spacing.sm },
  removeBtn: { padding: spacing.xs },
  removeText: { fontSize: 18 },
  footer: { padding: spacing.lg, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  totalLabel: { ...typography.body, color: colors.textSecondary },
  totalValue: { ...typography.body, color: colors.text },
  grandTotal: { marginTop: spacing.sm, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, marginBottom: spacing.lg },
  grandTotalLabel: { ...typography.h4, color: colors.text },
  grandTotalValue: { ...typography.h4, color: colors.primary },
  checkoutBtn: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: 12, alignItems: 'center' },
  checkoutText: { ...typography.button, color: colors.white },
});
