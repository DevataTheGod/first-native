import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  } as Notifications.NotificationBehavior),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  return true;
};

export const scheduleOrderNotification = async (
  title: string,
  body: string,
  orderId: string
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { orderId },
      sound: true,
    },
    trigger: null,
  });
};

export const sendOrderUpdateNotification = async (orderId: string, status: string) => {
  const statusMessages: Record<string, { title: string; body: string }> = {
    accepted: { title: 'Order Accepted!', body: 'Your chef has accepted your order.' },
    preparing: { title: 'Cooking in Progress', body: 'Your meal is being prepared.' },
    out_for_delivery: { title: 'On the Way!', body: 'Your order is on its way.' },
    delivered: { title: 'Delivered!', body: 'Your order has been delivered.' },
    cancelled: { title: 'Order Cancelled', body: 'Your order has been cancelled.' },
  };

  const message = statusMessages[status];
  if (message) {
    await scheduleOrderNotification(message.title, message.body, orderId);
  }
};

export const sendNewOrderNotification = async (orderId: string) => {
  await scheduleOrderNotification(
    'New Order!',
    'You have received a new order.',
    orderId
  );
};

export const sendChatNotification = async (senderName: string, message: string) => {
  await scheduleOrderNotification(
    `Message from ${senderName}`,
    message,
    'chat'
  );
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
