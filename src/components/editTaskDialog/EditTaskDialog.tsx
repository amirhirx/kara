import { useContext } from "react"
import { TodoContext } from "../../contexts/todoContext"
import { useState } from "react"
import type { ITask } from "../../types/task"
import TaskDialog from "../taskDialog/TaskDialog"

interface IEditTaskDialog {
    id: string
    flag: boolean
    title: string
    text: string
    closeDialog: () => void
}

export default function EditTaskDialog({
    id,
    flag,
    title,
    text,
    closeDialog,
}: IEditTaskDialog) {
    const { editTask } = useContext(TodoContext)

    const [task, setTask] = useState<ITask>({
        id: id,
        flag: flag,
        text: text,
        title: title,
    })

    const editTaskHandler = () => {
        editTask(task)
        closeDialog()
    }

    const editTaskWithEnter = (event: { code: string }) => {
        if (event.code === "Enter") {
            editTaskHandler()
        }
    }

    return (
        <TaskDialog
            title="ویرایش کار"
            task={task}
            setTask={setTask}
            clickHandlerText={"ویرایش"}
            clickHandler={editTaskHandler}
            closeHandler={closeDialog}
            keyDownHandler={editTaskWithEnter}
        />
    )
}
