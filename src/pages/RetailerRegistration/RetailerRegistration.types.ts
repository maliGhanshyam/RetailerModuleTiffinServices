export interface Organization {
    _id: string;
    org_name: string;
  }
  
  export interface ISnackbar {
    open: boolean;
    message: string;
    severity: "success" | "error";
  }
  export interface RegisterResponse {
    statusCode: number;
    message: string;
  }
  
  export interface OrganizationLoc {
    loc: string;          
    address: string;       
    loc_contact: number;   
    loc_email: string;    
    _id: string; 
  }
  