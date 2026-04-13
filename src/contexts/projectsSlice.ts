import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IBoard, type IProject, type ITask, taskStatus } from "../types";
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
        newTask(
            state,
            action: PayloadAction<{
                projectId: string;
                boardId: string;
                title: string;
                description: string;
            }>,
        ) {
            const newTask: ITask = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                status: taskStatus.undone,
            };
            const project = state.projects.find(
                (p) => p.id === action.payload.projectId,
            );
            const board = project?.boards.find(
                (b) => b.id === action.payload.boardId,
            );
            board?.tasks.push(newTask);
        },
    },
});

export const { newProject, newBoard, newTask } = projectsSlice.actions;
export default projectsSlice.reducer;
