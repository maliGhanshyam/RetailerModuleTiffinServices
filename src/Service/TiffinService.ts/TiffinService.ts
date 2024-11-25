import axios from "axios";
import {
  Order,
  OrderApiResponse,
  Pagination,
} from "../../Types";
// import { Organization, UserData } from "../../Types";
import axiosInstance from "../Interceptor/axiosInstance";
import { TiffinApiResponse } from "../../Types/ApiResponse/ApiResponse";


const API_URL = process.env.REACT_APP_API_URL;
//Get all Tiffins
export const getAllOrders = async (): Promise<OrderApiResponse> => {
  try {
    console.log(`${API_URL}/retailers/getallorders`);
    const response = await axiosInstance.get<OrderApiResponse>(
      "/retailers/getallorders"
    );
    console.log("Hello",response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

//Get all Orders from status
// export const getOrderRequests = async (
//   status: string,
// ): Promise<{ data: Order[]; pagination: Pagination }> => {
//   try {
//     const url = `/retailers/getallorders?status=${status}`;
//     console.log(`Request URL: ${url}`);

//     const response = await axiosInstance.get<OrderApiResponse>(url);
//     console.log(`${status} Orders fetched Success `, response.data);

//     // Return data and pagination
//     return {
//       data: response.data.data,
//       pagination: response.data.pagination,
//     };
//   } catch (error) {
//     console.error("Failed to fetch admin requests:", error);
//     throw error;
//   }
// };


//TODO:
export const getOrderRequests = async (
  status: string
): Promise<{ data: Order[]; pagination: Pagination }> => {
  try {
    const url = `/retailers/getallorders?status=${status}`;
    console.log(`Request URL: ${url}`);

    const response = await axiosInstance.get<OrderApiResponse>(url);
    console.log(`${status} Orders fetched successfully`, response.data);

    // Return data and pagination
    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    // Narrow down the error type to handle it safely
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        console.warn(`No ${status} orders found. Returning default values.`);
        return {
          data: [],
          pagination: { totalItems: 0, currentPage: 1, totalPages: 1 },
        };
      }
      console.error(`Axios error fetching ${status} orders:`, error.message);
    } else {
      console.error(`Unexpected error fetching ${status} orders:`, error);
    }

    // Re-throw the error for unhandled scenarios
    throw error;
  }
};


//Get all Tiffins
export const getAllTiffins = async (): Promise<TiffinApiResponse> => {
  try {
    const response = await axiosInstance.get<TiffinApiResponse>(
      "/retailers/tiffinItems/getalltiffin"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tiffins:", error);
    throw error;
  }
};