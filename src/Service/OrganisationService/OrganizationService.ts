import axios from "axios";
import {
  Organization,
  Pagination,
  OrganizationsApiResponse
} from "../../Types";
// import { Organization, UserData } from "../../Types";
import axiosInstance from "../Interceptor/axiosInstance";
import  { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
// const token = getToken();

// const API_URL = "http://localhost:5000";
// console.log("API URL:", process.env.REACT_APP_API_URL);


interface AddRequestResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null | string;
    upsertedCount: number;
    matchedCount: number;
  };
}

// Fetch all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    console.log(`${API_URL}/superadmin/organizations/getallorganization`);
    const response = await axiosInstance.get<OrganizationsApiResponse>(
      "/superadmin/organizations/getallorganization"
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    throw error;
  }
};


// xport const registerRetailer = async (_id: string): Promise<void> => {
//   try {
//     const url = `${API_URL}/superadmin/approveadmin/${admin_id}`;
//     console.log("Approving admin with URL:", url);
//     await axiosInstance.put(url, {}); // Empty body for PUT request
//     console.log(`Admin with ID ${admin_id} approved successfully`);
//   } catch (error) {
//     console.error("Failed to approve admin:", error);
//     throw error;
//   }
// };
export const addRetailerRequest = async (
  orgId: string,
  orgLocation: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    console.log(
      `Adding retailer request for Org ID: ${orgId}, Location: ${orgLocation}`
    );

 const response = await axiosInstance.put<AddRequestResponse>(
   `/retailers/addRequest/${orgId}?org_location=${orgLocation}`,
   {}
 );

    // Validate the response
    if (
      response.data.statusCode === 200 &&
      response.data.success === true &&
      response.data.data.modifiedCount === 1
    ) {
      console.log(
        "Retailer request added successfully:",
        response.data.message
      );
      return {
        success: true,
        message: response.data.message || "Request added successfully",
      };
    } else {
      console.warn("Retailer request failed:", response.data.message);
      return {
        success: false,
        message: response.data.message || "Failed to add request",
      };
    }
  } catch (error) {
    // Type guard for AxiosError
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? JSON.stringify(axiosError.response.data)
        : axiosError.message;

      console.error("Detailed Axios Error:", errorMessage);

      return {
        success: false,
        message: errorMessage || "Network error occurred",
      };
    }

    // Handle any other unexpected errors
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};