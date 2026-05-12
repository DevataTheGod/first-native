import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../theme';
import { MealCard, EmptyState } from '../../components/ui';
import { useMealsStore, useFavoritesStore } from '../../store';

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { meals } = useMealsStore();
  const { favorites } = useFavoritesStore();
  const favoriteMeals = meals.filter((m) => favorites.includes(m.id));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState icon="heart-outline" title="No Favorites" description="Add meals to your favorites to see them here" />}
        renderItem={({ item }) => <MealCard meal={item} onPress={() => navigation.navigate('User', { screen: 'MealDetails', params: { mealId: item.id } })} isFavorite />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: { justifyContent: 'space-between' },
});
