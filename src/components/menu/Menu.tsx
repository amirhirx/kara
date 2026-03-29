import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import AddTaskDialog from "../addTaskDialog/AddTaskDialog";
import { Link } from "react-router-dom";

function Menu() {
    const [showNewTaskDialog, setShowNewDialog] = useState(false);
    // TODO: show new task dialog with shorcuts

    const toggleNewTaskDialog = () => setShowNewDialog((prev) => !prev);
    return (
        <nav className="bg-[var(--primary-color)] py-2.5 px-8 flex items-center justify-between shadow border border-[var(--secondary-color)]">
            <Link
                to={"/"}
                className="text-2xl font-black text-[var(--text-color)] select-none"
            >
                تودو
            </Link>
            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <Link
                    to={"/new"}
                    className="bg-blue-400 text-white font-black md:py-2 md:px-3 p-1.5 rounded-lg transition active:scale-95 active:bg-blue-500 flex items-center text-sm select-none"
                >
                    <span className="hidden md:inline">کار جدید</span>
                    <PlusIcon className="h-5 w-5 text-white md:mr-2" />
                </Link>

                {showNewTaskDialog ? (
                    <AddTaskDialog closeDialog={toggleNewTaskDialog} />
                ) : null}
            </div>
        </nav>
    );
}

export default Menu;
