import { Role } from "./role";

export interface User {
  id: number;
  address: string;
  fullname: string;
  phone_number: string;
  is_active: boolean;
  role: Role;
  facebook_account_id: number;
  google_account_id: number;
  date_of_birth: number;
}

export interface Comment {
  content: string;
  user: User;
}
