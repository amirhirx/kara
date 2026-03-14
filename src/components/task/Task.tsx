import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useContext, useState } from "react"
import { TodoContext } from "../../contexts/todoContext"
import { CheckCircleIcon as CheckCircleOutline } from "@heroicons/react/24/outline"
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid"
import type { ITask } from "../../types/task"
import { EditTaskDialog } from ".."

function Task({ id, flag, title, text }: ITask) {
    const { removeTask, toggleTaskFlag } = useContext(TodoContext)

    const [isRemoving, setIsRemoving] = useState(false)
    const removeTaskHandler = () => {
        setIsRemoving(true)
        setTimeout(() => removeTask(id), 300)
    }

    const [showEditTaskDialog, setShowEditTaskDialog] = useState(false)
    return (
        <>
            {showEditTaskDialog && (
                <EditTaskDialog
                    id={id}
                    flag={flag}
                    title={title}
                    text={text}
                    closeDialog={() => setShowEditTaskDialog(false)}
                />
            )}
            <div
                id={id}
                className={`shadow border-2 border-[var(--secondary-color)] bg-[var(--primary-color)] m-4 p-4 rounded-md transition ${
                    flag && "line-through opacity-45"
                } ${isRemoving && "opacity-0 scale-50"}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex item-center gap-1">
                        {flag ? (
                            <CheckCircleOutline
                                className="h-5 w-5 text-[var(--text-color)] transition active:scale-90"
                                onClick={() => toggleTaskFlag(id)}
                            />
                        ) : (
                            <CheckCircleSolid
                                className="h-5 w-5 text-[var(--text-color)] transition active:scale-90"
                                onClick={() => toggleTaskFlag(id)}
                            />
                        )}
                        <h3
                            className={` text-xl font-bold text-[var(--text-color)]`}
                        >
                            {title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <PencilSquareIcon
                            className="h-5 w-5 text-[var(--text-color)] transition active:scale-90"
                            onClick={() => setShowEditTaskDialog(true)}
                        />
                        <TrashIcon
                            className="h-5 w-5 text-[var(--text-color)] transition active:scale-90"
                            onClick={() => removeTaskHandler()}
                        />
                    </div>
                </div>
                <p className="text-[var(--text-color)]">{text}</p>
            </div>
        </>
    )
}

export default Task
