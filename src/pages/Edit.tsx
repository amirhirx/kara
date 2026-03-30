import { useContext, useState } from "react";
import { TaskForm } from "../components";
import { TodoContext } from "../contexts/todoContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
    const { todo, editTask } = useContext(TodoContext);
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const task = todo.find((task) => task.id == id);

    const handleClick = () => {
        if (task && editingTask!.title.length >= 3) {
            editTask(editingTask!);
            navigate("/");
        } else {
            alert("عنوان باید بیشتر از ۳ حرف باشد");
        }
    };

    const [editingTask, setEditingTask] = useState(task);

    return (
        <>
            {task ? (
                <TaskForm
                    title="ویرایش کار"
                    task={editingTask!}
                    updateTask={(newTask) => setEditingTask(newTask)}
                    onClick={handleClick}
                    clickLabel="ویرایش"
                />
            ) : (
                <div className="w-full min-h-100 flex justify-center items-center">
                    <div className="text-[var(--text-color)]">
                        <h2 className="font-extrabold text-xl">
                            کار مورد نظر شما پیدا نشد!
                        </h2>
                        <p>یک کار جدید ایجاد کنید</p>
                    </div>
                </div>
            )}
        </>
    );
}
