import { useContext, useState } from "react";
import { Menu, AddTaskDialog, TasksContainer } from "../components";
import { TodoContext } from "../contexts/todoContext";

export default function Home() {
    const { todo } = useContext(TodoContext);
    const [showNewTaskDialog, setShowNewDialog] = useState(false);

    const openNewTaskDialog = () => setShowNewDialog(true);
    const closeNewTaskDialog = () => setShowNewDialog(false);
    return (
        <>
            <Menu toggleShowAddTaskDialog={openNewTaskDialog} />
            {showNewTaskDialog ? (
                <AddTaskDialog closeDialog={closeNewTaskDialog} />
            ) : null}
            <TasksContainer tasks={todo} />
        </>
    );
}
