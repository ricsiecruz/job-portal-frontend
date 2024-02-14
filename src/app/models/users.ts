import { Roles } from "./roles";

export interface Users {
    [x: string]: any;
    _id?: number;
    role?: Roles;
    email?: string;
    password?: string;
    confirm_pass?: string;
}