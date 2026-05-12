import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal, CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (meal: Meal) => void;
  removeItem: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (meal) => {
    const items = get().items;
    const existing = items.find(item => item.meal.id === meal.id);
    
    if (existing) {
      set({
        items: items.map(item =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { meal, quantity: 1 }] });
    }
    AsyncStorage.setItem('cart', JSON.stringify(get().items));
  },
  
  removeItem: (mealId) => {
    set({ items: get().items.filter(item => item.meal.id !== mealId) });
    AsyncStorage.setItem('cart', JSON.stringify(get().items));
  },
  
  updateQuantity: (mealId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(mealId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.meal.id === mealId ? { ...item, quantity } : item
      ),
    });
    AsyncStorage.setItem('cart', JSON.stringify(get().items));
  },
  
  clearCart: () => {
    set({ items: [] });
    AsyncStorage.removeItem('cart');
  },
  
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.meal.price * item.quantity,
      0
    );
  },
}));
