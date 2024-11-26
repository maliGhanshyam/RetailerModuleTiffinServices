export interface OrderValue {
  _id: string;
  cart: Cart;
  payment_mode: string;
  payment_status: string;
  delivery_status: string;
  isActive: boolean;
  created_at:string;
  updated_at:string;	
}
export interface Cart {
  retailer_id: string;
  customer_id: string;
  items: Item[];
  total_amount: number;
  created_at:string;
  retailer_name:string;
  customer_name:string;
  customer_contact:string;
  isActive: boolean;
  _id: string;
  payment_mode: string;
  payment_status: string;
  delivery_status: string;
}
export interface Item {
  tiffin_id: string;
  quantity: number;
  price: number;
  _id: string;
  tiffin_name:string;
  tiffin_type:string;
}
export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: [];
}
