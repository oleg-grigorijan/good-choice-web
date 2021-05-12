import {UserRole} from "./user.model";

export interface Credentials {
  email: string,
  password: string,
}

export interface Auth {
  email: string,
  password: string,
  role: UserRole,
}
