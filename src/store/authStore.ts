import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  role: 'user' | 'chef' | null;
  isOnboarded: boolean;
  setUser: (user: any) => void;
  setRole: (role: 'user' | 'chef') => void;
  setOnboarded: (value: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  isOnboarded: false,
  
  setUser: (user) => set({ user }),
  
  setRole: (role) => {
    set({ role });
    AsyncStorage.setItem('userRole', role);
  },
  
  setOnboarded: (value) => {
    set({ isOnboarded: value });
    AsyncStorage.setItem('isOnboarded', JSON.stringify(value));
  },
  
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password.length >= 6) {
      set({
        isAuthenticated: true,
        user: { email, name: email.split('@')[0] },
        token: 'mock_token_' + Date.now(),
      });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    AsyncStorage.removeItem('userRole');
    AsyncStorage.removeItem('isOnboarded');
  },
}));
