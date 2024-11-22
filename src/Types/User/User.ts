export interface User {
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: RoleSpecificDetails;
}


export interface RoleSpecificDetails {
  organization_id: string;
  organization_name: string;
  approval_status: string;
}
