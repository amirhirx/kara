import type { ITask } from "../../types";

export default function Board({
    title,
    tasks,
}: {
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
                            <li
                                key={id}
                                className={`bg-[var(--secondary-color)]/50 rounded py-1 px-2`}
                            >
                                {title}
                            </li>
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
            <div className="bg-[var(--secondary-color)] p-1 rounded-lg flex items-center">
                <input
                    type="text"
                    placeholder="عنوان وظیفه را وارد کنید..."
                    className="w-full px-1 text-sm outline-none select-none"
                />
                <button className="select-none text-xs bg-[var(--primary-color)] py-1 px-2 rounded-lg transition active:scale-95">
                    افزودن
                </button>
            </div>
        </div>
    );
}
