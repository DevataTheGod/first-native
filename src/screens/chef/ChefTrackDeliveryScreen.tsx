import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';

export const ChefTrackDeliveryScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.title}>Track Delivery</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.mapPlaceholder}><Ionicons name="map-outline" size={80} color={colors.textMuted} /><Text style={styles.mapText}>Delivery tracking map</Text></View>
        <View style={styles.deliveryInfo}>
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}><Ionicons name="person" size={32} color={colors.textMuted} /></View>
            <View style={styles.driverInfo}><Text style={styles.driverName}>Driver Assigned</Text><Text style={styles.driverPhone}>+1 234 567 890</Text></View>
            <TouchableOpacity style={styles.callBtn}><Ionicons name="call" size={24} color={colors.primary} /></TouchableOpacity>
          </View>
          <View style={styles.statusTimeline}>
            <View style={styles.timelineItem}><View style={[styles.timelineDot, styles.dotActive]} /><Text style={styles.timelineText}>Picked up from restaurant</Text><Text style={styles.timelineTime}>2 min ago</Text></View>
            <View style={styles.timelineItem}><View style={[styles.timelineDot, styles.dotActive]} /><Text style={styles.timelineText}>On the way</Text><Text style={styles.timelineTime}>Now</Text></View>
            <View style={styles.timelineItem}><View style={styles.timelineDot} /><Text style={styles.timelineText}>Delivered</Text></View>
          </View>
        </View>
      </View>
      <View style={styles.footer}><Button title="Mark as Delivered" onPress={() => navigation.goBack()} style={styles.button} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1 },
  mapPlaceholder: { height: 200, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  mapText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  deliveryInfo: { padding: spacing.lg },
  driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg },
  driverAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  driverInfo: { flex: 1, marginLeft: spacing.md },
  driverName: { ...typography.body, fontWeight: '600', color: colors.text },
  driverPhone: { ...typography.caption, color: colors.textSecondary },
  callBtn: { padding: spacing.sm },
  statusTimeline: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg },
  timelineItem: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  timelineDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border, marginRight: spacing.md },
  dotActive: { backgroundColor: colors.success },
  timelineText: { ...typography.body, color: colors.text, flex: 1 },
  timelineTime: { ...typography.caption, color: colors.textSecondary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
