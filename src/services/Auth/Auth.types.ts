export interface RegisterData {
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  confirmPassword: string;
  gst_no: string;
  role_id: string;
}
export interface RegisterResponse {
  statuscode: number;
  message: string;
  token?: string;
}
export interface Approval {
  approval_status: string;
  organization_id: string;
  }
export interface User {
  user_image: string;
  role_specific_details: {
    gst_no: string;
    approval:Approval;
  };
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  password: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  role_id:string;
}

export interface UserResponse {
  statuscode: number;
  data: User;
}
export interface Profile {
  user_image: string;
  username: string;
  email: string;
  contact_number: string;
  organization_id:string;
  address: string;
  gst_no: string;
  role_id: string;
  approval_status: string;
}
export interface ProfileResponse {
  statusCode: number;
  message: string;
  token?: string;
}
