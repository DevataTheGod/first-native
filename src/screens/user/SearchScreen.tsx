import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../theme';
import { Input, MealCard, EmptyState } from '../../components/ui';
import { useMealsStore } from '../../store';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { searchQuery, setSearchQuery, getFilteredMeals } = useMealsStore();
  const filteredMeals = getFilteredMeals();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchContainer}>
          <Input placeholder="Search meals, chefs..." leftIcon="search-outline" value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState icon="search-outline" title="No Results" description="Try different keywords or browse categories" />}
        renderItem={({ item }) => <MealCard meal={item} onPress={() => navigation.navigate('User', { screen: 'MealDetails', params: { mealId: item.id } })} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  searchContainer: { marginBottom: spacing.sm },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: { justifyContent: 'space-between' },
});
