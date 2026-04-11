import { useState } from "react";

export default function NewTask({
    clickHandler,
}: {
    clickHandler: (title: string) => void;
}) {
    const [title, setTitle] = useState<string>("");
    return (
        <div className="bg-[var(--secondary-color)] p-1 rounded-lg flex items-center">
            <input
                type="text"
                placeholder="عنوان وظیفه را وارد کنید..."
                className="w-full px-1 text-sm outline-none select-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                onClick={() => clickHandler(title)}
                className="select-none text-xs bg-[var(--primary-color)] py-1 px-2 rounded-lg transition active:scale-95"
            >
                افزودن
            </button>
        </div>
    );
}
