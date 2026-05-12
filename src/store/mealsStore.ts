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
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (id: string, meal: Partial<Meal>) => void;
  deleteMeal: (id: string) => void;
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

  addMeal: (mealData) => {
    const newMeal: Meal = {
      ...mealData,
      id: `meal-${Date.now()}`,
    };
    set({ meals: [...get().meals, newMeal] });
    AsyncStorage.setItem('meals', JSON.stringify([...get().meals, newMeal]));
  },

  updateMeal: (id, mealData) => {
    set({
      meals: get().meals.map(m => m.id === id ? { ...m, ...mealData } : m),
    });
  },

  deleteMeal: (id) => {
    set({ meals: get().meals.filter(m => m.id !== id) });
  },
}));
