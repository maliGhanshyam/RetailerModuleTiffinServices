import axios from "axios";
import axiosInstance from "../TiffinService/axiosInstance";
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;
    if (data.token && data.refreshToken) {
      setTokens(data.token, data.refreshToken);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getToken = (): string | null => localStorage.getItem("token");
export const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");

export const setTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};
