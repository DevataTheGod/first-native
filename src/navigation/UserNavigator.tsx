import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserStackParamList } from './types';
import { HomeFeedScreen } from '../screens/user/HomeFeedScreen';
import { FollowingScreen } from '../screens/user/FollowingScreen';
import { SearchScreen } from '../screens/user/SearchScreen';
import { CartScreen } from '../screens/user/CartScreen';
import { ProfileScreen } from '../screens/user/ProfileScreen';
import { MealDetailsScreen } from '../screens/user/MealDetailsScreen';
import { FavoritesScreen } from '../screens/user/FavoritesScreen';
import { CheckoutScreen } from '../screens/user/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/user/OrderTrackingScreen';
import { UserChatScreen } from '../screens/user/UserChatScreen';
import { OrderHistoryScreen } from '../screens/user/OrderHistoryScreen';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const UserTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Following': iconName = focused ? 'people' : 'people-outline'; break;
            case 'Search': iconName = focused ? 'search' : 'search-outline'; break;
            case 'Cart': iconName = focused ? 'cart' : 'cart-outline'; break;
            case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
            default: iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeFeedScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const UserStack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator: React.FC = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <UserStack.Screen name="UserTabs" component={UserTabNavigator} />
      <UserStack.Screen name="MealDetails" component={MealDetailsScreen} />
      <UserStack.Screen name="Favorites" component={FavoritesScreen} />
      <UserStack.Screen name="Checkout" component={CheckoutScreen} />
      <UserStack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <UserStack.Screen name="Chat" component={UserChatScreen} />
      <UserStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </UserStack.Navigator>
  );
};
