import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { MealCard, EmptyState } from '../../components/ui';
import { useMealsStore } from '../../store';

export const HomeFeedScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { meals } = useMealsStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.title}>What would you like to eat?</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </View>
        
        <View style={styles.categories}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[]}
            renderItem={() => <View style={styles.categoryItem}><View style={styles.categoryImage}><Ionicons name="restaurant-outline" size={20} color={colors.primary} /></View><Text style={styles.categoryText}>Category</Text></View>}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MealCard
                meal={item}
                onPress={() => navigation.navigate('User', { screen: 'MealDetails', params: { mealId: item.id } })}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Meals</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={meals.slice().sort((a, b) => b.rating - a.rating)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MealCard
                meal={item}
                onPress={() => navigation.navigate('User', { screen: 'MealDetails', params: { mealId: item.id } })}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  greeting: { ...typography.bodySmall, color: colors.textSecondary },
  title: { ...typography.h2, color: colors.text },
  categories: { paddingVertical: spacing.md },
  categoryItem: { alignItems: 'center', marginHorizontal: spacing.md },
  categoryImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  categoryText: { ...typography.caption, color: colors.text },
  section: { paddingVertical: spacing.md },
  sectionTitle: { ...typography.h4, color: colors.text, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
});
