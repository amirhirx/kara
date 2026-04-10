import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
