import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';
import { useOrdersStore } from '../../store';

export const ChefOrderDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<any, 'OrderDetails'>>();
  const navigation = useNavigation<any>();
  const { orders, updateOrderStatus, simulateOrderProgress } = useOrdersStore();
  const order = orders.find((o: any) => o.id === route.params?.orderId);

  if (!order) {
    return <SafeAreaView style={styles.container}><Text style={styles.errorText}>Order not found</Text></SafeAreaView>;
  }

  const handleAccept = () => {
    updateOrderStatus(order.id, 'accepted');
  };

  const handleReject = () => {
    updateOrderStatus(order.id, 'cancelled');
    navigation.goBack();
  };

  const handleStartPreparing = () => {
    updateOrderStatus(order.id, 'preparing');
  };

  const handleStartChat = () => {
    navigation.navigate('ClientCommunication', { orderId: order.id });
  };

  const handleHandOff = () => {
    simulateOrderProgress(order.id);
    navigation.navigate('TrackDelivery', { orderId: order.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}><Text style={styles.statusLabel}>Current Status</Text><Text style={styles.statusValue}>{order.status.replace('_', ' ')}</Text></View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Items</Text>{order.items.map((item: any, index: number) => <View key={index} style={styles.itemRow}><Text style={styles.itemQty}>{item.quantity}x</Text><Text style={styles.itemName}>{item.meal.title}</Text><Text style={styles.itemPrice}>${(item.meal.price * item.quantity).toFixed(2)}</Text></View>)}</View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Delivery Address</Text><View style={styles.infoRow}><Ionicons name="location-outline" size={20} color={colors.textSecondary} /><Text style={styles.infoText}>{order.deliveryAddress}</Text></View><View style={styles.infoRow}><Ionicons name="call-outline" size={20} color={colors.textSecondary} /><Text style={styles.infoText}>{order.contactPhone}</Text></View></View>
        <View style={styles.totalSection}><View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${order.total.toFixed(2)}</Text></View></View>
      </ScrollView>
      <View style={styles.footer}>
        {order.status === 'pending' && (
          <View style={styles.actionRow}>
            <Button title="Reject" variant="outline" onPress={handleReject} style={styles.rejectBtn} />
            <Button title="Accept" onPress={handleAccept} style={styles.acceptBtn} />
          </View>
        )}
        {order.status === 'accepted' && <Button title="Start Preparing" onPress={handleStartPreparing} style={styles.button} />}
        {order.status === 'preparing' && (
          <View style={styles.actionRow}>
            <Button title="Chat with Client" onPress={handleStartChat} style={styles.halfButton} />
            <Button title="Hand Off" onPress={handleHandOff} style={styles.halfButton} />
          </View>
        )}
        {order.status === 'out_for_delivery' && (
          <Button title="Track Delivery" onPress={() => navigation.navigate('TrackDelivery', { orderId: order.id })} style={styles.button} />
        )}
        {order.status === 'delivered' && <Text style={styles.deliveredText}>Order completed!</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  errorText: { ...typography.body, color: colors.error, textAlign: 'center', marginTop: spacing.xl },
  statusCard: { backgroundColor: colors.primary, borderRadius: borderRadius.md, padding: spacing.lg, marginVertical: spacing.lg, alignItems: 'center' },
  statusLabel: { ...typography.bodySmall, color: colors.white, opacity: 0.8 },
  statusValue: { ...typography.h2, color: colors.white, textTransform: 'capitalize' },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  itemQty: { ...typography.body, color: colors.primary, width: 30 },
  itemName: { ...typography.body, color: colors.text, flex: 1 },
  itemPrice: { ...typography.body, color: colors.textSecondary },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  infoText: { ...typography.body, color: colors.text, marginLeft: spacing.sm },
  totalSection: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.xl },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { ...typography.h4, color: colors.text },
  totalValue: { ...typography.h3, color: colors.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  actionRow: { flexDirection: 'row', gap: spacing.md },
  rejectBtn: { flex: 1 },
  acceptBtn: { flex: 1 },
  button: { width: '100%' },
  halfButton: { flex: 1, marginRight: spacing.sm },
  deliveredText: { ...typography.body, color: colors.success, textAlign: 'center' },
});
