import { Pagination } from "./Pagination";
import { Organization } from "../Organization/Organization";
import { User } from "../User/User";
import { Cart } from "../Tiffins/Cart";
import { Order } from "../Tiffins/Order";
import { Tiffin } from "../Tiffins/Tiffin";

export interface UserApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: User[];
  pagination: Pagination;
}
export interface OrganizationsApiResponse {
  statuscode: number;
  data: Organization[];
  pagination: Pagination;
}
export interface OrderApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}

export interface TiffinApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Tiffin[];
  pagination: Pagination;
}