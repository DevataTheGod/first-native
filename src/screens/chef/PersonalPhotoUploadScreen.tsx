import React from 'react';
import { UploadScreen } from './UploadScreen';

export const PersonalPhotoUploadScreen: React.FC = () => (
  <UploadScreen
    title="Personal Photo"
    subtitle="Step 1 of 4"
    step={1}
    totalSteps={4}
    nextScreen="PoliceClearanceUpload"
    icon="person-outline"
  />
);
