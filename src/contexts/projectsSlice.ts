import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProject } from "../types";
import { nanoid } from "nanoid";

interface projectsState {
    projects: IProject[];
}

const initialState: projectsState = {
    projects: [],
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        newProject(
            state,
            action: PayloadAction<{ title: string; description: string }>,
        ) {
            const newProject: IProject = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                boards: [],
            };
            state.projects.push(newProject);
        },
    },
});

export const { newProject } = projectsSlice.actions;
export default projectsSlice.reducer;
