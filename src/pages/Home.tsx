import { useContext } from "react";
import { TasksContainer } from "../components";
import { TodoContext } from "../contexts/todoContext";

export default function Home() {
    const { todo } = useContext(TodoContext);
    return (
        <>
            <TasksContainer tasks={todo} />
        </>
    );
}
