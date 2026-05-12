import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/ui';

interface UploadScreenProps {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
  nextScreen: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  title,
  subtitle,
  step,
  totalSteps,
  nextScreen,
  icon,
}) => {
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Step {step} of {totalSteps}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(step / totalSteps) * 100}%` }]} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons name={icon} size={60} color={colors.primary} />
              <Text style={styles.uploadText}>Tap to upload</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.requirements}>
          <Text style={styles.requirementsTitle}>Requirements:</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.requirementText}>Clear, readable document</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.requirementText}>Not expired</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title={image ? 'Continue' : 'Skip for Now'}
          onPress={handleContinue}
          loading={loading}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary },
  progressBar: { height: 4, backgroundColor: colors.border, marginHorizontal: spacing.lg },
  progress: { height: '100%', backgroundColor: colors.primary },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  uploadArea: { flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: spacing.xl },
  uploadText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.md },
  previewImage: { width: '100%', height: 300, borderRadius: borderRadius.lg, resizeMode: 'cover' },
  requirements: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.xl },
  requirementsTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.md },
  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  requirementText: { ...typography.body, color: colors.textSecondary, marginLeft: spacing.sm },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
