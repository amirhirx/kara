import type { ITask } from "../../types/task"

export default function TaskDialog({
    title,
    task,
    setTask,
    clickHandlerText,
    clickHandler,
    closeHandler,
    keyDownHandler,
}: {
    title: string
    task: ITask
    setTask: React.Dispatch<React.SetStateAction<ITask>>
    clickHandlerText: string
    clickHandler: () => void
    closeHandler: () => void
    keyDownHandler: (event: { code: string }) => void
}) {
    return (
        <div className="w-full h-full backdrop-blur-xs bg-black/35 fixed top-0 left-0 flex items-center justify-center z-10">
            <div className="bg-[var(--primary-color)] my-4 w-11/12 md:w-120 mx-auto rounded-xl p-4 popup-animation shadow border border-[var(--secondary-color)]">
                <h2 className="font-bold text-xl text-[var(--text-color)]">
                    {title}
                </h2>
                <div className="my-2">
                    <label
                        htmlFor="new-task-title"
                        className="text-[var(--text-color)] font-semibold"
                    >
                        عنوان
                    </label>
                    <input
                        id="new-task-title"
                        name="new-task-title"
                        type="text"
                        className="w-full border border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 rounded-md outline-none mt-1 px-2 py-1 shadow text-[var(--text-color)]"
                        value={task.title}
                        onChange={(event) => {
                            setTask((prev) => {
                                return { ...prev, title: event?.target.value }
                            })
                        }}
                        onKeyDown={keyDownHandler}
                        autoFocus
                    />
                </div>
                <div className="my-2">
                    <label
                        htmlFor="new-task-text"
                        className="text-[var(--text-color)] font-semibold"
                    >
                        توضیحات
                    </label>
                    <textarea
                        name="new-task-text"
                        id="new-task-text"
                        rows={4}
                        className="w-full min-w-full max-w-full min-h-12 border border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 rounded-md outline-none mt-1 px-2 py-1 shadow text-[var(--text-color)] text-sm"
                        value={task.text}
                        onChange={(event) => {
                            setTask((prev) => {
                                return { ...prev, text: event?.target.value }
                            })
                        }}
                    ></textarea>
                </div>
                <button
                    onClick={clickHandler}
                    className="bg-green-500 text-white font-bold py-2 px-4 mt-2 text-sm rounded-md cursor-pointer transition active:bg-green-600 active:scale-95"
                >
                    {clickHandlerText}
                </button>
                <button
                    className="m-2 text-[var(--text-color)] cursor-pointer"
                    onClick={closeHandler}
                >
                    بستن
                </button>
            </div>
        </div>
    )
}
