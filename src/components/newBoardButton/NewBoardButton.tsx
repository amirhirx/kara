import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { newBoard } from "../../contexts/projectsSlice";

export default function NewBoardButton({ projectId }: { projectId: string }) {
    const dispatch = useDispatch();
    const clickHandler = () => {
        const title = prompt("Enter project title:") || "";
        const description = prompt("Enter project description:") || "";
        if (title?.length >= 3) {
            dispatch(
                newBoard({
                    projectId,
                    title: title,
                    description: description,
                }),
            );
        } else {
            alert("Your title must be more 3 characters");
        }
    };
    return (
        <button
            onClick={clickHandler}
            className="w-60 bg-[var(--primary-color)] text-[var(--text-color)] py-2.5 px-4 rounded-lg text-sm font-semibold flex gap-1 justify-center items-center opacity-75 hover:opacity-100 transition active:scale-95"
        >
            افزودن لیست جدید
            <Plus className="w-5" />
        </button>
    );
}
