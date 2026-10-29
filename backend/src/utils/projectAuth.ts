import { Types } from "mongoose";

interface ProjectRoles {
  owner: Types.ObjectId;
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
}

const eq = (a: Types.ObjectId | string, b: string) => a.toString() === b;

export const isOwner = (project: ProjectRoles, userId: string): boolean =>
  eq(project.owner, userId);

export const isAdmin = (project: ProjectRoles, userId: string): boolean =>
  isOwner(project, userId) || project.admins.some((id) => eq(id, userId));

export const isMember = (project: ProjectRoles, userId: string): boolean =>
  isOwner(project, userId) || project.members.some((id) => eq(id, userId));
