import { useContext, useState } from "react"
import { TodoContext } from "../../contexts/todoContext"
import { nanoid } from "nanoid"
import type { ITask } from "../../types/task"
import TaskDialog from "../taskDialog/TaskDialog"

interface IAddTaskDialog {
    closeDialog: () => void
}

export default function AddTaskDialog({ closeDialog }: IAddTaskDialog) {
    const { newTask } = useContext(TodoContext)

    const [newTaskObj, setNewTaskObj] = useState<ITask>({
        id: nanoid(),
        flag: false,
        title: "",
        text: "",
    })

    const addNewTask = () => {
        newTask(newTaskObj)
        closeDialog()
    }

    const addTaskWithEnter = (event: { code: string }) => {
        if (event.code === "Enter") {
            addNewTask()
        }
    }

    return (
        <TaskDialog
            title={"کار جدید"}
            task={newTaskObj}
            setTask={setNewTaskObj}
            clickHandlerText={"افزودن"}
            clickHandler={addNewTask}
            closeHandler={closeDialog}
            keyDownHandler={addTaskWithEnter}
        />
    )
}
