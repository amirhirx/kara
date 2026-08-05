import { useState } from "react";
import { useDispatch } from "react-redux";
import { newTask } from "../../contexts/projectsSlice";
import MessageDialog from "../messageDialog/MessageDialog";
import { X } from "lucide-react";

export default function NewTask({
    projectId,
    boardId,
}: {
    projectId: string;
    boardId: string;
}) {
    const [title, setTitle] = useState<string>("");
    const [alertDialog, setAlertDialog] = useState(false);
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
        } else setAlertDialog(true);
    };

    return (
        <>
            {alertDialog && (
                <MessageDialog
                    title="خطا برای ایجاد وظیفه"
                    description="عنوان نباید خالی یا کمتر از ۳  کاراکتر باشد"
                    closeHandler={() => setAlertDialog(false)}
                />
            )}
            <div className="bg-secondary p-1 rounded-lg flex items-center">
                {title.length >= 1 && (
                    <X
                        className="w-5"
                        onClick={() => setTitle("")}
                    />
                )}
                <input
                    type="text"
                    placeholder="عنوان وظیفه را وارد کنید..."
                    className="w-full px-1 text-sm outline-none select-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={clickHandler}
                    className="select-none text-xs bg-primary py-1 px-2 rounded-lg transition active:scale-95"
                >
                    افزودن
                </button>
            </div>
        </>
    );
}
