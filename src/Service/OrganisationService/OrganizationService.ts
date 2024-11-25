import axios from "axios";
import {
  Organization,
  Pagination,
  OrganizationsApiResponse
} from "../../Types";
// import { Organization, UserData } from "../../Types";
import axiosInstance from "../Interceptor/axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;
// const token = getToken();

// const API_URL = "http://localhost:5000";
// console.log("API URL:", process.env.REACT_APP_API_URL);


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