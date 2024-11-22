export interface Cart {
  retailer_id: string;
  customer_id: string;
  items: CartItem[];
  total_amount: number;
  created_at: string;
  isActive: boolean;
  _id: string;
  __v: number;
  retailer_name: string;
  customer_name: string;
}

export interface CartItem {
  tiffin_id: string;
  quantity: number;
  price: number;
  _id: string;
  tiffin_name: string;
  tiffin_type: "veg" | string; 
}
