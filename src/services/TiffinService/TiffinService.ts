import { AddTiffin, AddTiffinResponse } from "./AddTiffin.types";
import axiosInstance from "./axiosInstance";

const API_URL = process.env.REACT_APP_API_URL;
export const addTiffin = async (form: AddTiffin): Promise<AddTiffin> => {
  try {
    const response = await axiosInstance.post<AddTiffinResponse>(
      `${API_URL}/retailers/tiffinItems/addtiffin`,
      form
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to add tiffin:", error);
    throw error;
  }
};

export const uploadTiffinImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/retailers/tiffinItems/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};
