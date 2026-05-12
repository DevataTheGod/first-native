export type PaymentMethod = 'card' | 'cash' | 'wallet';

export interface PaymentDetails {
  method: PaymentMethod;
  cardLast4?: string;
  cardBrand?: string;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  createdAt: string;
}

export interface CardDetails {
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
  name: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}
