import { useContext } from "react"
import { ThemeContext } from "../../contexts/themeContext"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div onClick={toggleTheme} className="transition active:scale-95">
            {theme ? (
                <MoonIcon className="h-6 w-6 text-[var(--text-color)]" />
            ) : (
                <SunIcon className="h-6 w-6 text-[var(--text-color)]" />
            )}
        </div>
    )
}
