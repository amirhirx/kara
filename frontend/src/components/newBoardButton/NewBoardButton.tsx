import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { newBoard } from "../../contexts/projectsSlice";
import { useState } from "react";
import MessageDialog from "../messageDialog/MessageDialog";

export default function NewBoardButton({ projectId }: { projectId: string }) {
    const dispatch = useDispatch();
    const [alertDialog, setAlertDialog] = useState(false);

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
        } else setAlertDialog(true);
    };
    return (
        <>
            {alertDialog && (
                <MessageDialog
                    title="خطا برای ایجاد بورد"
                    description="عنوان نباید خالی یا کمتر از ۳  کاراکتر باشد"
                    closeHandler={() => setAlertDialog(false)}
                />
            )}
            <button
                onClick={clickHandler}
                className="w-60 bg-primary text-text py-2.5 px-4 rounded-lg text-sm font-semibold flex gap-1 justify-center items-center opacity-75 hover:opacity-100 transition active:scale-95"
            >
                افزودن لیست جدید
                <Plus className="w-5" />
            </button>
        </>
    );
}
