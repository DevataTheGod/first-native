import { create } from 'zustand';
import { Order, OrderStatus } from '../types';

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByUser: (userId: string) => Order[];
  getOrdersByChef: (chefId: string) => Order[];
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  
  addOrder: (order) => {
    set({ orders: [...get().orders, order] });
  },
  
  updateOrderStatus: (orderId, status) => {
    set({
      orders: get().orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      ),
    });
  },
  
  getOrdersByUser: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  },
  
  getOrdersByChef: (chefId) => {
    return get().orders.filter(order => order.chefId === chefId);
  },
}));
