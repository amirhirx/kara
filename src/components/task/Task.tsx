import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/todoContext";
import { CheckCircleIcon as CheckCircleOutline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import type { ITask } from "../../types/task";
import { Link } from "react-router-dom";

function Task({ id, flag, title, text }: ITask) {
    const { removeTask, toggleTaskFlag } = useContext(TodoContext);
    const [isRemoving, setIsRemoving] = useState(false);
    const removeTaskHandler = () => {
        setIsRemoving(true);
        setTimeout(() => removeTask(id), 300);
    };

    return (
        <div
            id={id}
            className={`shadow border border-[var(--secondary-color)] bg-[var(--primary-color)] m-4 p-4 rounded-xl transition ${
                flag && "line-through opacity-45"
            } ${isRemoving && "opacity-0 scale-50"}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex item-center gap-1">
                    <div className="w-max">
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
                    </div>

                    <h3
                        className={`text-xl font-bold text-[var(--text-color)] line-clamp-1`}
                    >
                        {title}
                    </h3>
                </div>
                <div className="flex items-center gap-1">
                    <Link to={`/edit/${id}`}>
                        <PencilSquareIcon className="h-5 w-5 text-[var(--text-color)] transition active:scale-90" />
                    </Link>
                    <TrashIcon
                        className="h-5 w-5 text-[var(--text-color)] transition active:scale-90"
                        onClick={() => removeTaskHandler()}
                    />
                </div>
            </div>
            <p className="text-[var(--text-color)] line-clamp-3">{text}</p>
        </div>
    );
}

export default Task;
