import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email?: string; phone?: string };
  ResetPassword: { email?: string };
  RoleSelection: undefined;
};

export type UserTabParamList = {
  Home: undefined;
  Following: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type UserStackParamList = {
  UserTabs: NavigatorScreenParams<UserTabParamList>;
  MealDetails: { mealId: string };
  Favorites: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
  Chat: { orderId: string };
  OrderHistory: undefined;
};

export type ChefStackParamList = {
  ChefDashboard: NavigatorScreenParams<any>;
  AddMeal: undefined;
  OrderDetails: { orderId: string };
  ClientCommunication: { orderId: string };
  TrackDelivery: { orderId: string };
  Ratings: undefined;
  Settings: undefined;
};

export type ChefDocumentStackParamList = {
  PersonalPhotoUpload: undefined;
  PoliceClearanceUpload: undefined;
  IDUpload: undefined;
  MedicalCertificateUpload: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  RoleSelection: undefined;
  ChefDocuments: undefined;
  User: undefined;
  Chef: undefined;
};
