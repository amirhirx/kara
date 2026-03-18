import { PlusIcon } from "@heroicons/react/24/solid"
import type { MouseEventHandler } from "react"
import ThemeToggleButton from "./ThemeToggleButton"

interface IMenu {
    toggleShowAddTaskDialog: MouseEventHandler
}

function Menu({ toggleShowAddTaskDialog }: IMenu) {
    return (
        <nav className="bg-[var(--primary-color)] py-2.5 px-8 flex items-center justify-between shadow border border-[var(--secondary-color)]">
            <h1 className="text-2xl font-black text-[var(--text-color)]">
                تودو
            </h1>
            <div className="flex items-center gap-4">
                <ThemeToggleButton />
                <button
                    onClick={toggleShowAddTaskDialog}
                    className="bg-blue-400 text-white font-black md:py-2 md:px-3 p-1.5 rounded-lg transition active:scale-95 active:bg-blue-500 flex items-center text-sm"
                >
                    <span className="hidden md:inline">کار جدید</span>
                    <PlusIcon className="h-5 w-5 text-white md:mr-2" />
                </button>
            </div>
        </nav>
    )
}

export default Menu
