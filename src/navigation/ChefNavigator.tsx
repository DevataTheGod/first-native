import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChefStackParamList } from './types';
import { ChefDashboardScreen } from '../screens/chef/ChefDashboardScreen';
import { ChefOrdersScreen } from '../screens/chef/ChefOrdersScreen';
import { ChefProfileScreen } from '../screens/chef/ChefProfileScreen';
import { AddMealScreen } from '../screens/chef/AddMealScreen';
import { ChefOrderDetailsScreen } from '../screens/chef/ChefOrderDetailsScreen';
import { ChefCommunicationScreen } from '../screens/chef/ChefCommunicationScreen';
import { ChefTrackDeliveryScreen } from '../screens/chef/ChefTrackDeliveryScreen';
import { ChefRatingsScreen } from '../screens/chef/ChefRatingsScreen';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const ChefTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Dashboard': iconName = focused ? 'grid' : 'grid-outline'; break;
            case 'Orders': iconName = focused ? 'receipt' : 'receipt-outline'; break;
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
      <Tab.Screen name="Dashboard" component={ChefDashboardScreen} />
      <Tab.Screen name="Orders" component={ChefOrdersScreen} />
      <Tab.Screen name="Profile" component={ChefProfileScreen} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator<ChefStackParamList>();

export const ChefNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ChefDashboard" component={ChefTabNavigator} />
      <Stack.Screen name="AddMeal" component={AddMealScreen} />
      <Stack.Screen name="OrderDetails" component={ChefOrderDetailsScreen} />
      <Stack.Screen name="ClientCommunication" component={ChefCommunicationScreen} />
      <Stack.Screen name="TrackDelivery" component={ChefTrackDeliveryScreen} />
      <Stack.Screen name="Ratings" component={ChefRatingsScreen} />
    </Stack.Navigator>
  );
};
