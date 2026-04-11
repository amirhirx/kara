import ThemeToggleButton from "./ThemeToggleButton";
import { Link } from "react-router-dom";

function Menu() {
    // TODO: show new task dialog with shorcuts

    return (
        <nav className="bg-[var(--primary-color)] py-2 px-8 flex items-center justify-between shadow border border-[var(--secondary-color)]">
            <Link
                to={"/"}
                className="text-xl font-black text-[var(--text-color)] select-none"
            >
                کارا
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggleButton />
            </div>
        </nav>
    );
}

export default Menu;
