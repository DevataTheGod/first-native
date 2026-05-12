import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Input, Button } from '../../components/ui';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  category: yup.string().required('Category is required'),
  prepTime: yup.string().required('Prep time is required'),
});

type FormData = yup.InferType<typeof schema>;

export const AddMealScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '', price: 0, category: '', prepTime: '' },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
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
        <TouchableOpacity style={styles.imageUpload}>
          <Ionicons name="camera-outline" size={40} color={colors.textMuted} />
          <Text style={styles.uploadText}>Tap to add photo</Text>
        </TouchableOpacity>
        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Meal Title"
                placeholder="Enter meal title"
                leftIcon="restaurant-outline"
                value={value}
                onChangeText={onChange}
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Description"
                placeholder="Describe your meal"
                leftIcon="document-text-outline"
                value={value}
                onChangeText={onChange}
                error={errors.description?.message}
                multiline
              />
            )}
          />
          <View style={styles.row}>
            <View style={styles.half}>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Price ($)"
                    placeholder="0.00"
                    leftIcon="cash-outline"
                    value={value ? value.toString() : ''}
                    onChangeText={(text) => onChange(parseFloat(text) || 0)}
                    error={errors.price?.message}
                    keyboardType="decimal-pad"
                  />
                )}
              />
            </View>
            <View style={styles.half}>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Category"
                    placeholder="e.g. Italian"
                    leftIcon="pricetag-outline"
                    value={value}
                    onChangeText={onChange}
                    error={errors.category?.message}
                  />
                )}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="prepTime"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Prep Time"
                placeholder="e.g. 30 min"
                leftIcon="time-outline"
                value={value}
                onChangeText={onChange}
                error={errors.prepTime?.message}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Add Meal"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          style={styles.button}
        />
      </View>
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
  imageUpload: {
    height: 180,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  uploadText: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  form: { marginBottom: spacing.xl },
  row: { flexDirection: 'row', gap: spacing.md },
  half: { flex: 1 },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  button: { width: '100%' },
});
