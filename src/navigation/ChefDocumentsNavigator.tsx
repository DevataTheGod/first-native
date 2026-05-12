import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChefDocumentStackParamList } from './types';
import { PersonalPhotoUploadScreen } from '../screens/chef/PersonalPhotoUploadScreen';
import { PoliceClearanceUploadScreen } from '../screens/chef/PoliceClearanceUploadScreen';
import { IDUploadScreen } from '../screens/chef/IDUploadScreen';
import { MedicalCertificateUploadScreen } from '../screens/chef/MedicalCertificateUploadScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<ChefDocumentStackParamList>();

export const ChefDocumentsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="PersonalPhotoUpload" component={PersonalPhotoUploadScreen} />
      <Stack.Screen name="PoliceClearanceUpload" component={PoliceClearanceUploadScreen} />
      <Stack.Screen name="IDUpload" component={IDUploadScreen} />
      <Stack.Screen name="MedicalCertificateUpload" component={MedicalCertificateUploadScreen} />
    </Stack.Navigator>
  );
};
