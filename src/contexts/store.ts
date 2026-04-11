import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import projectSlice from "./projectsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        projects: projectSlice,
    },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
