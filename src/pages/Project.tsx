import { useParams } from "react-router-dom";
import { Board, BoardsContainer, NewBoardButton } from "../components";
import { useSelector } from "react-redux";
import type { RooteState } from "../contexts/store";

export default function Project() {
    const { id } = useParams();
    const projectId = id || "";
    const projects = useSelector(
        (state: RooteState) => state.projects.projects,
    );

    const projectIndex = projects.findIndex((item) => item.id === id);
    return (
        <div>
            {projects[projectIndex] ? (
                <BoardsContainer>
                    {projects[projectIndex].boards.map(
                        ({ id, title, tasks }) => {
                            return (
                                <Board
                                    key={id}
                                    title={title}
                                    tasks={tasks}
                                    projectId={projectId}
                                    boardId={id}
                                />
                            );
                        },
                    )}
                    <NewBoardButton projectId={projects[projectIndex].id} />
                </BoardsContainer>
            ) : (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <h2 className="font-bold">پروژه پیدا نشد!</h2>
                </div>
            )}
        </div>
    );
}
