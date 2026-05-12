import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Input, Button } from '../../components/ui';
import { useMealsStore } from '../../store';

export const AddMealScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { addMeal } = useMealsStore();
  const [image, setImage] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', prepTime: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'Valid price is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.prepTime) newErrors.prepTime = 'Prep time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Meal</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={40} color={colors.textMuted} />
              <Text style={styles.uploadText}>Tap to add photo</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Input label="Meal Title" placeholder="e.g. Spaghetti Carbonara" value={form.title} onChangeText={(t) => setForm({ ...form, title: t })} error={errors.title} />
          <Input label="Description" placeholder="Describe your dish..." value={form.description} onChangeText={(t) => setForm({ ...form, description: t })} error={errors.description} multiline />
          <View style={styles.row}>
            <View style={styles.half}>
              <Input label="Price ($)" placeholder="0.00" value={form.price} onChangeText={(t) => setForm({ ...form, price: t })} error={errors.price} keyboardType="decimal-pad" />
            </View>
            <View style={styles.half}>
              <Input label="Category" placeholder="e.g. Italian" value={form.category} onChangeText={(t) => setForm({ ...form, category: t })} error={errors.category} />
            </View>
          </View>
          <Input label="Prep Time" placeholder="e.g. 30 min" value={form.prepTime} onChangeText={(t) => setForm({ ...form, prepTime: t })} error={errors.prepTime} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Add Meal" onPress={handleSubmit} loading={loading} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { ...typography.h3, color: colors.text },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  imageUpload: { height: 180, backgroundColor: colors.surface, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.lg, overflow: 'hidden' },
  uploadText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  form: { marginBottom: spacing.xl },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
