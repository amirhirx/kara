import { Button } from "..";
import type { ITask } from "../../types/task";

export default function TaskForm({
    title,
    task,
    updateTask,
    clickLabel,
    onClick,
}: {
    title: string;
    task: ITask;
    updateTask: (newTask: ITask) => void;
    clickLabel: string;
    onClick: () => void;
}) {
    return (
        <div className="w-11/12 md:w-8/12 mx-auto pt-8 text-[var(--text-color)] space-y-2">
            <h2 className="text-2xl font-black">{title}</h2>
            <div className="flex flex-col">
                <label
                    htmlFor="task-title"
                    className="text-lg font-bold mb-1"
                >
                    عنوان
                </label>
                <input
                    type="text"
                    name="task-title"
                    id="task-title"
                    value={task.title}
                    onChange={(e) =>
                        updateTask({ ...task, title: e.target.value })
                    }
                    className="p-2 rounded-lg text-xl border bg-[var(--primary-color)] border-[var(--secondary-color)] outline-none shadow"
                    placeholder="عنوان را وارد کنید..."
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="task-text"
                    className="text-lg font-bold mb-1"
                >
                    توضیحات
                </label>
                <textarea
                    name="task-text"
                    id="task-text"
                    cols={30}
                    rows={10}
                    value={task.text}
                    onChange={(e) =>
                        updateTask({ ...task, text: e.target.value })
                    }
                    placeholder="توضیحات را وارد کنید..."
                    className="p-2 min-h-14 h-40 max-h-80 rounded-lg border bg-[var(--primary-color)] border-[var(--secondary-color)] outline-none shadow"
                />
            </div>
            <div className="py-2">
                <Button
                    variant="primary"
                    onClick={onClick}
                >
                    {clickLabel}
                </Button>
            </div>
        </div>
    );
}
