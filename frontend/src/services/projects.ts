import type { ProjectPayload } from "@/types";

export const createProject = async ({ title, description }: ProjectPayload) => {
  try {
    const endpoint = "http://localhost:3000/api/projects";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
      credentials: "include",
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
    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  try {
    const endpoint = "http://localhost:3000/api/projects/" + id;
    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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
    const endpoint = "http://localhost:3000/api/projects/" + id;
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteProject = async ({ id }: { id: string }) => {
  try {
    const endpoint = "http://localhost:3000/api/projects/" + id;
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const archiveProject = async ({ id }: { id: string }) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/archive`;
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const unArchiveProject = async ({ id }: { id: string }) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/unarchive`;
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjectMembers = async ({ id }: { id: string }) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/members`;
    const res = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const inviteMember = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/members`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeMember = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/members/${userId}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const leaveProject = async ({ id }: { id: string }) => {
  try {
    const endpoint = `http://localhost:3000/api/projects/${id}/leave`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
