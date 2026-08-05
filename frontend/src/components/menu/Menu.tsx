import ThemeToggleButton from "./ThemeToggleButton";
import { Link } from "react-router-dom";

function Menu() {
    // TODO: show new task dialog with shorcuts

    return (
        <nav className="w-8 h-[96vh] my-auto rounded-2xl fixed top-3 right-5 bg-primary py-4 px-8 flex flex-col items-center justify-between shadow border border-secondary">
            <Link
                to={"/"}
                className="text-xl font-black text-text select-none"
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
