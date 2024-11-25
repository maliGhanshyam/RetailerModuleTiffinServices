import axiosInstance from "../Interceptor/axiosInstance";
import { ApiResponse, Tiffin } from "./Tiffin.types";

const API_URL = process.env.REACT_APP_API_URL!;

export const getAllTiffins = async (
  page?: number,
  limit?: number
): Promise<{ data: Tiffin[]; totalPages: number; totalItems: number }> => {
  try {
    const response = await axiosInstance.get<
      ApiResponse & { pagination: { totalPages: number; totalItems: number } }
    >(`${API_URL}/retailers/tiffinItems/getalltiffin?page=${page}&limit=${limit}`);
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
      totalItems: response.data.pagination.totalItems,
    };
  } catch (error) {
    throw error;
  }
};

// export const confirmOrders = async (orderid: string): Promise<OrderValue[]> => {
//   try {
//     const response = await axiosInstance.get<ApiResponse>(
//       `${API_URL}/retailers/order/confirmpayment/${orderid}`
//     );
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const cancelTiffins = async (tiffinid: string): Promise<Tiffin[]> => {
  try {
    const response = await axiosInstance.delete<ApiResponse>(
      `${API_URL}/retailers/tiffinItems/deletetiffin/${tiffinid}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const searchTiffins = async (
  query: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/retailers/tiffinItems/searchTiffinItem`,
      {
        params: { query, page, limit },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
