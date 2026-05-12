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
  hydrate: () => Promise<void>;
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
      const user = { email, name: email.split('@')[0] };
      set({
        isAuthenticated: true,
        user,
        token: 'mock_token_' + Date.now(),
      });
      await AsyncStorage.setItem('authUser', JSON.stringify(user));
      return true;
    }
    return false;
  },
  
  logout: async () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    await Promise.all([
      AsyncStorage.removeItem('userRole'),
      AsyncStorage.removeItem('isOnboarded'),
      AsyncStorage.removeItem('authUser'),
    ]);
  },

  hydrate: async () => {
    try {
      const [isOnboarded, userRole, authUser] = await Promise.all([
        AsyncStorage.getItem('isOnboarded'),
        AsyncStorage.getItem('userRole'),
        AsyncStorage.getItem('authUser'),
      ]);
      set({
        isOnboarded: isOnboarded ? JSON.parse(isOnboarded) : false,
        role: userRole as 'user' | 'chef' | null,
        user: authUser ? JSON.parse(authUser) : null,
        isAuthenticated: !!authUser,
      });
    } catch (e) {
      console.log('Failed to hydrate auth state', e);
    }
  },
}));
