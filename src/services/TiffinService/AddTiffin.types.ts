export interface AddTiffin {
  tiffin_image_url?: string;
  tiffin_name: string;
  tiffin_available_quantity: number;
  tiffin_description: string;
  retailer_id: string;
  tiffin_type: string;
  tiffin_price: number;
  tiffin_isavailable: boolean;
}

export interface AddTiffinResponse {
  statuscode: number;
  data: AddTiffin;
}
