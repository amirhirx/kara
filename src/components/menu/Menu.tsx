import { PlusIcon } from "@heroicons/react/24/solid";
import ThemeToggleButton from "./ThemeToggleButton";
import { Link } from "react-router-dom";
import { Button } from "..";

function Menu() {
    // TODO: show new task dialog with shorcuts

    return (
        <nav className="bg-[var(--primary-color)] py-2.5 px-8 flex items-center justify-between shadow border border-[var(--secondary-color)]">
            <Link
                to={"/"}
                className="text-2xl font-black text-[var(--text-color)] select-none"
            >
                کارا
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <Link to={"/new"}>
                    <Button>
                        <span className="hidden md:inline">کار جدید</span>
                        <PlusIcon className="h-5 w-5 text-white md:mr-2" />
                    </Button>
                </Link>
            </div>
        </nav>
    );
}

export default Menu;
