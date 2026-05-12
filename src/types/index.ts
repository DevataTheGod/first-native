export type UserRole = 'user' | 'chef' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'chef';
  avatar?: string;
}

export interface Chef extends User {
  bio?: string;
  coverImage?: string;
  personalPhoto?: string;
  isVerified: boolean;
  rating: number;
  totalOrders: number;
}

export interface Meal {
  id: string;
  chefId: string;
  chefName: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  isAvailable: boolean;
}

export interface CartItem {
  meal: Meal;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  chefId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryAddress: string;
  contactPhone: string;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  role: UserRole;
  isOnboarded: boolean;
}

export interface DocumentUpload {
  type: 'personal_photo' | 'police_clearance' | 'id' | 'medical_certificate';
  uri?: string;
  verified: boolean;
}
