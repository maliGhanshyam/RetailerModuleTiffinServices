import { Cart } from "./Cart";

export interface Order {
  _id: string;
  cart: Cart;
  payment_mode: string;
  payment_status: string;
  delivery_status: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}
