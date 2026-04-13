import { useState } from "react";
import { useDispatch } from "react-redux";
import { newTask } from "../../contexts/projectsSlice";

export default function NewTask({
    projectId,
    boardId,
}: {
    projectId: string;
    boardId: string;
}) {
    const [title, setTitle] = useState<string>("");
    const dispatch = useDispatch();

    const clickHandler = () => {
        if (title.length >= 3) {
            dispatch(
                newTask({
                    projectId,
                    boardId,
                    title: title,
                    description: "",
                }),
            );
            setTitle("");
        } else {
            alert("Title must be more 3 characters");
        }
    };

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
                onClick={clickHandler}
                className="select-none text-xs bg-[var(--primary-color)] py-1 px-2 rounded-lg transition active:scale-95"
            >
                افزودن
            </button>
        </div>
    );
}
