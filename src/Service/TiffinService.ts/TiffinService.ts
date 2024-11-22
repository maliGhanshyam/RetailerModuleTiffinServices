import axios from "axios";
import {
  OrderApiResponse,
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