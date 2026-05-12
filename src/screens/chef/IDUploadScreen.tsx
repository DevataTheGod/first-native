import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';

export const IDUploadScreen: React.FC = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = React.useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>ID Upload</Text>
        <Text style={styles.subtitle}>Step 3 of 4</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '75%' }]} />
      </View>
      <View style={styles.content}>
        <View style={styles.uploadArea}>
          <TouchableOpacity style={styles.uploadBtn} onPress={() => setPhoto('uploaded')}>
            <Ionicons name="card-outline" size={60} color={colors.primary} />
            <Text style={styles.uploadText}>Tap to upload ID</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.requirements}>
          <Text style={styles.requirementsTitle}>Accepted IDs:</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.requirementText}>Government-issued ID</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.requirementText}>Driver's License</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.requirementText}>Passport</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title={photo ? 'Continue' : 'Skip for Now'}
          onPress={() => navigation.navigate('MedicalCertificateUpload' as never)}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...typography.h3, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary },
  progressBar: { height: 4, backgroundColor: colors.border, marginHorizontal: spacing.lg },
  progress: { height: '100%', backgroundColor: colors.primary },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  uploadArea: { flex: 1, justifyContent: 'center' },
  uploadBtn: { height: 300, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  uploadText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.md },
  requirements: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.xl },
  requirementsTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  requirementText: { ...typography.body, color: colors.textSecondary, marginLeft: spacing.sm },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
