import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { EmptyState } from '../../components/ui';

export const ChefRatingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const reviews = [
    { id: '1', user: 'John D.', rating: 5, comment: 'Amazing food! Will order again.', date: '2 days ago' },
    { id: '2', user: 'Sarah M.', rating: 4, comment: 'Great taste, slightly delayed.', date: '1 week ago' },
    { id: '3', user: 'Mike R.', rating: 5, comment: 'Best chef in the area!', date: '2 weeks ago' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Ratings & Reviews</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ratingCard}>
          <View style={styles.ratingMain}>
            <Text style={styles.ratingValue}>4.8</Text>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={20} color={colors.warning} />
              ))}
            </View>
            <Text style={styles.ratingCount}>Based on 124 reviews</Text>
          </View>
        </View>
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person" size={24} color={colors.textMuted} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={14}
                      color={star <= review.rating ? colors.warning : colors.border}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  ratingCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  ratingMain: { alignItems: 'center' },
  ratingValue: { ...typography.h1, color: colors.white, fontSize: 48 },
  ratingStars: { flexDirection: 'row', marginVertical: spacing.sm },
  ratingCount: { ...typography.bodySmall, color: colors.white, opacity: 0.8 },
  reviewsList: { marginBottom: spacing.xl },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: { flex: 1, marginLeft: spacing.md },
  userName: { ...typography.body, fontWeight: '600', color: colors.text },
  reviewDate: { ...typography.caption, color: colors.textSecondary },
  starsRow: { flexDirection: 'row' },
  reviewComment: { ...typography.body, color: colors.textSecondary },
});
