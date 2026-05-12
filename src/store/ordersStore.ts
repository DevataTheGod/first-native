import { create } from 'zustand';
import { Order, OrderStatus } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendOrderUpdateNotification, sendNewOrderNotification } from '../services/notificationService';

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByUser: (userId: string) => Order[];
  getOrdersByChef: (chefId: string) => Order[];
  simulateOrderProgress: (orderId: string) => void;
}

const ORDER_STATUS_FLOW: OrderStatus[] = ['pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered'];

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  
  addOrder: async (order) => {
    set({ orders: [...get().orders, order] });
    AsyncStorage.setItem('orders', JSON.stringify([...get().orders, order]));
    await sendNewOrderNotification(order.id);
  },
  
  updateOrderStatus: async (orderId, status) => {
    const updatedOrders = get().orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    set({ orders: updatedOrders });
    AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
    await sendOrderUpdateNotification(orderId, status);
  },
  
  getOrdersByUser: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  },
  
  getOrdersByChef: (chefId) => {
    return get().orders.filter(order => order.chefId === chefId);
  },

  simulateOrderProgress: async (orderId) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order) return;
    
    const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status);
    if (currentIndex < ORDER_STATUS_FLOW.length - 1) {
      const nextStatus = ORDER_STATUS_FLOW[currentIndex + 1];
      await get().updateOrderStatus(orderId, nextStatus);
    }
  },
}));
