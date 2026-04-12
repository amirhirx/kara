import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IProject } from "../types";
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
        newBoard(
            state,
            action: PayloadAction<{
                projectId: string;
                title: string;
                description: string;
            }>,
        ) {
            const newBoard: IBoard = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                tasks: [],
            };
            const project = state.projects.find(
                (p) => p.id === action.payload.projectId,
            );
            project?.boards.push(newBoard);
        },
    },
});

export const { newProject, newBoard } = projectsSlice.actions;
export default projectsSlice.reducer;
