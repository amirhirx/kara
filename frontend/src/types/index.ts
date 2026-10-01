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
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
