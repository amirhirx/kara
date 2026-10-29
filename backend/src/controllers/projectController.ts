import { Request, Response } from "express";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/auth";
import { isValidObjectId } from "mongoose";
import { isAdmin } from "../utils/projectAuth";
import User from "../models/User";

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Bad request" });

    const project = await Project.create({
      title,
      description,
      owner: req.user!.userId,
      members: [],
    });

    return res.status(201).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;

    const projects = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
      isArchived: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id)
      return res.status(404).json({ message: "you must send project id" });

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userId = req.user.userId;

    const project = await Project.findOne({
      _id: id,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!project)
      return res
        .status(404)
        .json({ message: "there's no project with this id" });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!title && !description) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const userId = req.user.userId;

    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      { title, description },
      { new: true, runValidators: true },
    );

    if (!project) return res.status(404).json({ message: "project not found" });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userId = req.user.userId;

    const project = await Project.findOneAndDelete({ _id: id, owner: userId });

    if (!project) return res.status(404).json({ message: "project not found" });

    return res.status(200).json({ message: "project successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const archiveProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unautherized" });
    }

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userId = req.user.userId;

    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      { isArchived: true },
      { new: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const unArchiveProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unautherized" });
    }

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userId = req.user.userId;

    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      { isArchived: false },
      { new: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProjectMembers = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const userId = req.user.userId;

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const project = await Project.findOne({
      _id: id,
      $or: [{ owner: userId }, { members: userId }],
    })
      .populate("owner", "firstName lastName email")
      .populate("admins", "firstName lastName email")
      .populate("members", "firstName lastName email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      owner: project.owner,
      admins: project.admins,
      members: project.members,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const inviteMember = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unautherized" });
    }

    const { id } = req.params;
    const { email } = req.body;
    const userId = req.user.userId;

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "Project not found" });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!isAdmin(project, userId)) {
      return res
        .status(403)
        .json({ message: "Only owner or admin can invite members" });
    }

    const invitedUser = await User.findOne({ email: email });
    if (!invitedUser)
      return res.status(404).json({ message: "No user found with this email" });

    const invitedUserId = invitedUser._id.toString();

    if (invitedUserId === userId) {
      return res
        .status(400)
        .json({ message: "You are already part of this project" });
    }

    if (project.owner.toString() === invitedUserId) {
      return res.status(400).json({ message: "User is the project owner" });
    }

    if (project.members.some((member) => member.toString() === invitedUserId)) {
      return res.status(409).json({ message: "User is already a member" });
    }

    project.members.push(invitedUser._id);
    await project.save();

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
