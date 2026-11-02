export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProjectPayload {
  title: string;
  description?: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  owner: string;
  members: string[];
  admins: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMembers {
  owner: User;
  admins: User[];
  members: User[];
}

export type UserRoles = "member" | "admin" | "owner";
