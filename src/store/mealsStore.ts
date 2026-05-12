import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types';
import { MOCK_MEALS } from '../mocks/data';

interface MealsStore {
  meals: Meal[];
  searchQuery: string;
  selectedCategory: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  getFilteredMeals: () => Meal[];
}

export const useMealsStore = create<MealsStore>((set, get) => ({
  meals: MOCK_MEALS,
  searchQuery: '',
  selectedCategory: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  getFilteredMeals: () => {
    const { meals, searchQuery, selectedCategory } = get();
    return meals.filter(meal => {
      const matchesSearch = meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.chefName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || meal.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
}));
