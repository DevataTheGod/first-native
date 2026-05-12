import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted') return true;
    
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  } catch {
    return false;
  }
};

export const scheduleOrderNotification = async (
  title: string,
  body: string,
  orderId: string
) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { orderId } },
      trigger: null,
    });
  } catch {}
};

export const sendOrderUpdateNotification = async (orderId: string, status: string) => {
  const messages: Record<string, { title: string; body: string }> = {
    accepted: { title: 'Order Accepted!', body: 'Your chef has accepted.' },
    preparing: { title: 'Cooking', body: 'Meal is being prepared.' },
    out_for_delivery: { title: 'On the Way!', body: 'Delivery is on its way.' },
    delivered: { title: 'Delivered!', body: 'Enjoy your meal!' },
  };
  const msg = messages[status];
  if (msg) await scheduleOrderNotification(msg.title, msg.body, orderId);
};

export const sendNewOrderNotification = async (orderId: string) => {
  await scheduleOrderNotification('New Order!', 'You have a new order.', orderId);
};
