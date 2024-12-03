export interface MonthlyOrderData {
  month: string; // Format: YYYY-MM
  totalOrders: number;
  totalAmount: number;
}

export interface OrderCountData {
  count: number;
  delivery_status: string;
}
