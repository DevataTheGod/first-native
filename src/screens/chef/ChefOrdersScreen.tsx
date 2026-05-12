import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { EmptyState } from '../../components/ui';
import { useOrdersStore } from '../../store';

export const ChefOrdersScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { orders } = useOrdersStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'accepted':
      case 'preparing': return colors.primary;
      case 'out_for_delivery': return colors.secondary;
      case 'delivered': return colors.success;
      default: return colors.error;
    }
  };

  const renderOrder = ({ item }: any) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('Chef', { screen: 'OrderDetails', params: { orderId: item.id } })}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id.slice(-6)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
        </View>
      </View>
      <View style={styles.orderInfo}>
        <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.orderAddress} numberOfLines={1}>{item.deliveryAddress}</Text>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        <Text style={styles.orderTime}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}><Text style={styles.title}>Orders</Text></View>
      <FlatList data={orders} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListEmptyComponent={<EmptyState icon="receipt-outline" title="No Orders Yet" description="Orders will appear here when customers place them" />} renderItem={renderOrder} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  orderCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  orderId: { ...typography.body, fontWeight: '600', color: colors.text },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  statusText: { ...typography.caption, color: colors.white, fontWeight: '600', textTransform: 'capitalize' },
  orderInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  orderAddress: { ...typography.bodySmall, color: colors.textSecondary, marginLeft: spacing.xs, flex: 1 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm },
  orderTotal: { ...typography.body, fontWeight: '600', color: colors.primary },
  orderTime: { ...typography.caption, color: colors.textSecondary },
});
