import { useContext, useState } from "react";
import { TaskForm } from "../components";
import type { ITask } from "../types/task";
import { nanoid } from "nanoid";
import { TodoContext } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom";

export default function New() {
    const { newTask } = useContext(TodoContext);
    const navigate = useNavigate();
    const [task, setTask] = useState<ITask>({
        id: nanoid(),
        flag: false,
        title: "",
        text: "",
    });

    const handleClick = () => {
        if (task.title.length >= 3) {
            newTask(task);
            setTask({ id: nanoid(), flag: false, title: "", text: "" });
            navigate("/");
        } else {
            alert("عنوان باید بیشتر از ۳ حرف باشد");
        }
    };

    return (
        <TaskForm
            title="اضافه کردن کار جدید"
            task={task}
            updateTask={(newTask) => setTask(newTask)}
            clickLabel={"افزودن"}
            onClick={handleClick}
        />
    );
}
