import React from 'react';
import { UploadScreen } from './UploadScreen';

export const PoliceClearanceUploadScreen: React.FC = () => (
  <UploadScreen
    title="Police Clearance"
    subtitle="Step 2 of 4"
    step={2}
    totalSteps={4}
    nextScreen="IDUpload"
    icon="shield-checkmark-outline"
  />
);
