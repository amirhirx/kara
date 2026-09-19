import type { ProjectPayload } from "@/types";

export const createProject = async ({ title, description }: ProjectPayload) => {
  try {
    const endpoint = "http://localhost:3000/api/projects";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProjects = async () => {
  try {
    const endpoint = "http://localhost:3000/api/projects";
    const res = await fetch(endpoint);

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  try {
    const endpoint = "http://localhost:3000/api/projects" + id;
    const res = await fetch(endpoint);

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProjectById = async ({
  id,
  updated,
}: {
  updated: Partial<ProjectPayload>;
  id: string;
}) => {
  try {
    const endpoint = "http://localhost:3000/api/projects" + id;
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(updated),
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteProject = async ({ id }: { id: string }) => {
  try {
    const endpoint = "http://localhost:3000/api/projects" + id;
    const res = await fetch(endpoint);

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
