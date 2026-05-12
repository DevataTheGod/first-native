import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';
import { useMealsStore, useCartStore, useFavoritesStore } from '../../store';

export const MealDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { meals } = useMealsStore();
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const meal = meals.find((m: any) => m.id === route.params?.mealId);
  const [quantity, setQuantity] = React.useState(1);

  if (!meal) {
    return <View style={styles.container}><Text>Meal not found</Text></View>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(meal);
    navigation.navigate('User', { screen: 'Cart' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.text} /></TouchableOpacity>
          <View style={styles.imagePlaceholder}><Text style={styles.imageEmoji}>🍽️</Text></View>
          <TouchableOpacity style={styles.favoriteBtn} onPress={() => toggleFavorite(meal.id)}><Ionicons name={isFavorite(meal.id) ? 'heart' : 'heart-outline'} size={24} color={isFavorite(meal.id) ? colors.error : colors.text} /></TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleSection}><Text style={styles.title}>{meal.title}</Text><Text style={styles.chef}>by {meal.chefName}</Text></View>
            <View style={styles.priceContainer}><Text style={styles.price}>${meal.price.toFixed(2)}</Text></View>
          </View>
          <View style={styles.ratingRow}><Text style={styles.rating}>⭐ {meal.rating} ({meal.reviewCount} reviews)</Text><Text style={styles.prepTime}>⏱️ {meal.prepTime}</Text></View>
          <View style={styles.section}><Text style={styles.sectionTitle}>Description</Text><Text style={styles.description}>{meal.description}</Text></View>
          <View style={styles.section}><Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(quantity + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}><View style={styles.totalContainer}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalPrice}>${(meal.price * quantity).toFixed(2)}</Text></View><Button title="Add to Cart" onPress={handleAddToCart} disabled={!meal.isAvailable} style={styles.addBtn} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  imageContainer: { height: 250, backgroundColor: colors.surface, position: 'relative' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imageEmoji: { fontSize: 80 },
  backBtn: { position: 'absolute', top: spacing.md, left: spacing.md, backgroundColor: colors.white, padding: spacing.sm, borderRadius: borderRadius.full, zIndex: 1 },
  favoriteBtn: { position: 'absolute', top: spacing.md, right: spacing.md, backgroundColor: colors.white, padding: spacing.sm, borderRadius: borderRadius.full, zIndex: 1 },
  content: { padding: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  titleSection: { flex: 1 },
  title: { ...typography.h2, color: colors.text },
  chef: { ...typography.body, color: colors.textSecondary },
  priceContainer: { justifyContent: 'center' },
  price: { ...typography.h2, color: colors.primary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  rating: { ...typography.body, color: colors.text },
  prepTime: { ...typography.body, color: colors.textSecondary, marginLeft: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  description: { ...typography.body, color: colors.textSecondary, lineHeight: 24 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  quantity: { ...typography.h3, color: colors.text, marginHorizontal: spacing.lg },
  footer: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  totalContainer: { marginRight: spacing.lg },
  totalLabel: { ...typography.caption, color: colors.textSecondary },
  totalPrice: { ...typography.h3, color: colors.text },
  addBtn: { flex: 1 },
});
