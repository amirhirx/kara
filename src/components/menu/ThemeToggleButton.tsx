import { useDispatch, useSelector } from "react-redux";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import type { RooteState } from "../../contexts/store";
import { toggleTheme } from "../../contexts/themeSlice";

export default function ThemeToggleButton() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RooteState) => state.theme.theme);
    return (
        <div
            onClick={() => dispatch(toggleTheme())}
            className="transition active:scale-95"
        >
            {theme ? (
                <MoonIcon className="h-6 w-6 text-[var(--text-color)]" />
            ) : (
                <SunIcon className="h-6 w-6 text-[var(--text-color)]" />
            )}
        </div>
    );
}
