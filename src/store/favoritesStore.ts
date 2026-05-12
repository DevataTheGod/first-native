import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (mealId: string) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
  toggleFavorite: (mealId: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  
  addFavorite: (mealId) => {
    if (!get().favorites.includes(mealId)) {
      set({ favorites: [...get().favorites, mealId] });
      AsyncStorage.setItem('favorites', JSON.stringify(get().favorites));
    }
  },
  
  removeFavorite: (mealId) => {
    set({ favorites: get().favorites.filter(id => id !== mealId) });
    AsyncStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  
  isFavorite: (mealId) => get().favorites.includes(mealId),
  
  toggleFavorite: (mealId) => {
    if (get().isFavorite(mealId)) {
      get().removeFavorite(mealId);
    } else {
      get().addFavorite(mealId);
    }
  },
}));
