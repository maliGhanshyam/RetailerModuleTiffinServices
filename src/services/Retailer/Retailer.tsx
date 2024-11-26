import axiosInstance from "../Interceptor/axiosInstance";
import { ApiResponse, OrderValue } from "./Retailer.types";

const API_URL = process.env.REACT_APP_API_URL!;

export const getAllOrders = async (
  page?: number,
  limit?: number
): Promise<{ data: OrderValue[]; totalPages: number; totalItems: number }> => {
  try {
    const response = await axiosInstance.get<
      ApiResponse & { pagination: { totalPages: number; totalItems: number } }
    >(`${API_URL}/retailers/getallorders?page=${page}&limit=${limit}`);
    return {
      data: response.data.data,
      totalPages: response.data.pagination.totalPages,
      totalItems: response.data.pagination.totalItems,
    };
  } catch (error) {
    throw error;
  }
};
// export const getAllOrders = async (page?:number,limit?:number): Promise<OrderValue[]> => {
//   try {
//     const response = await axiosInstance.get<ApiResponse>(
//       `${API_URL}/retailers/getallorders?page=${page}&limit=${limit}`
//     );
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const confirmOrders = async (orderid: string): Promise<OrderValue[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      `${API_URL}/retailers/order/confirmpayment/${orderid}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const cancelOrders = async (orderid: string): Promise<OrderValue[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      `${API_URL}/retailers/cancelorder/${orderid}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const searchOrders = async (
  query: string,
  page: number,
  limit: number
) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/retailers/searchorders`,
      {
        params: { query, page, limit },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
