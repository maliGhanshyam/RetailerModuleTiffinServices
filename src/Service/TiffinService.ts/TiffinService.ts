import axios from "axios";
import {
  Order,
  OrderApiResponse,
  OrderCountData,
  Pagination,
} from "../../Types";
// import { Organization, UserData } from "../../Types";
import axiosInstance from "../Interceptor/axiosInstance";
import { OrderCountApiResponse, TiffinApiResponse } from "../../Types/ApiResponse/ApiResponse";


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
export const getOrderRequests = async (): Promise<OrderCountData[]> => {
  try {
    const url = `/retailers/getOrderCount`;
    console.log(`Request URL: ${url}`);

    const response = await axiosInstance.get<{ data: OrderCountData[] }>(url);
    console.log(`Orders fetched successfully`, response.data);

    // Return the data array directly
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching orders:`, error);
    throw error; // Re-throw the error for the caller to handle
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