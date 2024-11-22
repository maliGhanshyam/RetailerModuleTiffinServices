export interface Tiffin {
  _id: string;
  tiffin_name: string;
  tiffin_available_quantity: number;
  tiffin_description: string;
  retailer_id: string;
  tiffin_type: "veg" | "non-veg"; 
  tiffin_price: number;
  tiffin_rating: number;
  tiffin_isavailable: boolean;
  isActive: boolean;
  tiffin_created_at: string;
  tiffin_updated_at: string;
  __v: number;
}
