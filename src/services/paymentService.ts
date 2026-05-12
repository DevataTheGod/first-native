export const DELIVERY_FEE = 2.99;
export const SERVICE_FEE = 0.50;

export const calculateTotal = (subtotal: number, promoCode?: string): number => {
  let discount = 0;
  if (promoCode === 'FIRST10') {
    discount = subtotal * 0.1;
  }
  return subtotal + DELIVERY_FEE + SERVICE_FEE - discount;
};

export const processPayment = async (
  method: string,
  amount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    success: true,
    transactionId: `pi_${Date.now()}`,
  };
};
