import React from 'react';
import { UploadScreen } from './UploadScreen';

export const IDUploadScreen: React.FC = () => (
  <UploadScreen
    title="ID Upload"
    subtitle="Step 3 of 4"
    step={3}
    totalSteps={4}
    nextScreen="MedicalCertificateUpload"
    icon="card-outline"
  />
);
