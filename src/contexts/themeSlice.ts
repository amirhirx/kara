import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ThemeMode } from "../types";

interface ThemeState {
    theme: ThemeMode;
}

const getInitialState = (): ThemeMode => {
    const storedTheme = localStorage.getItem("theme") as ThemeMode;
    return storedTheme || ThemeMode.light;
};

const initialState: ThemeState = {
    theme: getInitialState(),
};

const saveTheme = (theme: ThemeMode) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            saveTheme(state.theme);
            state.theme =
                state.theme === ThemeMode.dark
                    ? ThemeMode.light
                    : ThemeMode.dark;
        },
        setTheme(state, action: PayloadAction<ThemeMode>) {
            saveTheme(state.theme);
            state.theme = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
