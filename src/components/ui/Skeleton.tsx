import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width: w = '100%',
  height = 20,
  borderRadius: br = borderRadius.sm,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(animatedValue, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width: w, height, borderRadius: br, opacity },
        style,
      ]}
    />
  );
};

export const MealCardSkeleton: React.FC = () => (
  <View style={styles.mealCard}>
    <Skeleton height={120} borderRadius={12} />
    <View style={styles.mealContent}>
      <Skeleton width="80%" height={16} />
      <Skeleton width="60%" height={14} style={{ marginTop: spacing.xs }} />
      <View style={styles.mealFooter}>
        <Skeleton width={60} height={18} />
        <Skeleton width={50} height={14} />
      </View>
    </View>
  </View>
);

export const ListItemSkeleton: React.FC = () => (
  <View style={styles.listItem}>
    <Skeleton width={60} height={60} borderRadius={8} />
    <View style={styles.listContent}>
      <Skeleton width="70%" height={16} />
      <Skeleton width="50%" height={14} style={{ marginTop: spacing.xs }} />
      <Skeleton width="30%" height={14} style={{ marginTop: spacing.xs }} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: { backgroundColor: colors.border },
  mealCard: { width: 180, backgroundColor: colors.card, borderRadius: 16, overflow: 'hidden', marginRight: spacing.md },
  mealContent: { padding: spacing.md },
  mealFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  listItem: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md },
  listContent: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
});
