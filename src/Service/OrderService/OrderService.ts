import { OrderSummaryApiResponse } from "../../Types";
import axiosInstance from "../Interceptor/axiosInstance";

export const getMonthlyOrders = async (
  year: number
): Promise<OrderSummaryApiResponse> => {
  try {
    const url = `/retailers/getmonthlyorders?year=${year}`;
      const response = await axiosInstance.get<OrderSummaryApiResponse>(url);
      console.log("Success in fetch monthly orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch monthly orders:", error);
    throw error;
  }
};
