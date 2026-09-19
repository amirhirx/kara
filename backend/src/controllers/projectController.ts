import { Request, Response } from "express";
import Project from "../models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Bad request" });

    const project = await Project.create({ title, description });
    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "you must send project id" });
    const project = await Project.findById(id);

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

// edit a project
export const updateProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const project = await Project.findByIdAndUpdate(id, { title, description });

    if (!project) return res.status(404).json({ message: "project not found" });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// delete a project
export const deleteProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: "project not found" });

    return res.status(200).json({ message: "project successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
