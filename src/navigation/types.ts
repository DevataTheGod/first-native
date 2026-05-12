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
  UserTabs: undefined;
  MealDetails: { mealId: string };
  Favorites: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
};

export type ChefStackParamList = {
  ChefDashboard: undefined;
  CompleteProfile: undefined;
  AddMeal: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
  ClientCommunication: { orderId: string };
  TrackDelivery: { orderId: string };
  Ratings: undefined;
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
