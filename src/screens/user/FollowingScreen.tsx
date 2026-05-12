import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../theme';
import { MealCard, EmptyState } from '../../components/ui';
import { MOCK_CHEFS, MOCK_MEALS } from '../../mocks/data';

export const FollowingScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>Following</Text></View>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.section}><Text style={styles.sectionTitle}>Followed Chefs</Text>
              <FlatList horizontal showsHorizontalScrollIndicator={false} data={MOCK_CHEFS} keyExtractor={(item) => item.id} renderItem={({ item }) => <View style={styles.chefCard}><View style={styles.avatar}><Ionicons name="person" size={32} color={colors.textMuted} /></View><Text style={styles.chefName} numberOfLines={1}>{item.name}</Text><Text style={styles.chefRating}>⭐ {item.rating}</Text></View>} />
            </View>
            <View style={styles.section}><Text style={styles.sectionTitle}>Meals from Followed Chefs</Text><View style={styles.mealsGrid}>{MOCK_MEALS.slice(0, 4).map((meal) => <MealCard key={meal.id} meal={meal} onPress={() => navigation.navigate('User', { screen: 'MealDetails', params: { mealId: meal.id } })} />)}</View></View>
          </View>
        }
        data={[]}
        renderItem={null}
        ListEmptyComponent={<EmptyState icon="people-outline" title="No Follows Yet" description="Start following chefs to see their meals here" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  section: { paddingVertical: spacing.md },
  sectionTitle: { ...typography.h4, color: colors.text, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  chefCard: { backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, alignItems: 'center', marginRight: spacing.md, width: 100, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  chefName: { ...typography.caption, fontWeight: '600', color: colors.text, textAlign: 'center' },
  chefRating: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs },
  mealsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.lg, gap: spacing.md },
});
