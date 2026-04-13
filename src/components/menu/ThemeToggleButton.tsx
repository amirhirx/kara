import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import type { RooteState } from "../../contexts/store";
import { toggleTheme } from "../../contexts/themeSlice";
import { ThemeMode } from "../../types";

export default function ThemeToggleButton() {
    const dispatch = useDispatch();
    const theme: ThemeMode = useSelector(
        (state: RooteState) => state.theme.theme,
    );
    return (
        <div
            onClick={() => dispatch(toggleTheme())}
            className="transition active:scale-95"
        >
            {theme === ThemeMode.dark ? (
                <Moon className="h-6 w-6 text-[var(--text-color)]" />
            ) : (
                <Sun className="h-6 w-6 text-[var(--text-color)]" />
            )}
        </div>
    );
}
