import type { ITask } from "../../types";
import Task from "./Task";
import NewTask from "./NewTask";

export default function Board({
    projectId,
    boardId,
    title,
    tasks,
}: {
    projectId: string;
    boardId: string;
    title: string;
    tasks: ITask[];
}) {
    return (
        <div className="w-64 bg-[var(--primary-color)] text-[var(--text-color)] p-2 rounded-lg space-y-2">
            <h2 className="font-bold text-lg">{title}</h2>
            <ul className="flex flex-col gap-2">
                {tasks.length >= 1 ? (
                    tasks.map(({ id, title }) => {
                        return (
                            <Task
                                key={id}
                                title={title}
                            />
                        );
                    })
                ) : (
                    <div className="py-4 flex items-center justify-center select-none">
                        <h3 className="font-medium text-sm">
                            وظیفه ای در این برد نیست!
                        </h3>
                    </div>
                )}
            </ul>
            <NewTask
                projectId={projectId}
                boardId={boardId}
            />
        </div>
    );
}
