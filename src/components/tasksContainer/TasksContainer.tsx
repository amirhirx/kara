import type { ITask } from "../../types/task"
import { Task } from ".."

export default function TasksContainer({ tasks }: { tasks: ITask[] }) {
    return (
        <div className="w-11/12 md:w-7/12 mx-auto">
            {tasks.map(({ id, flag, title, text }) => {
                return (
                    <Task
                        key={id}
                        id={id}
                        flag={flag}
                        title={title}
                        text={text}
                    />
                )
            })}
        </div>
    )
}
