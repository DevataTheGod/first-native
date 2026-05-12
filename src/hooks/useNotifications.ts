import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { requestNotificationPermissions } from '../services/notificationService';

export const useNotifications = () => {
  useEffect(() => {
    const setup = async () => {
      await requestNotificationPermissions();
    };
    setup();
  }, []);
};
