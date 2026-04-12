import { useParams } from "react-router-dom";
import { Board, BoardsContainer, NewBoardButton } from "../components";
import { useSelector } from "react-redux";
import type { RooteState } from "../contexts/store";

export default function Project() {
    const { id } = useParams();
    const projects = useSelector(
        (state: RooteState) => state.projects.projects,
    );

    const projectIndex = projects.findIndex((item) => item.id === id);
    return (
        <div>
            <BoardsContainer>
                {projects[projectIndex].boards.map(({ id, title, tasks }) => {
                    return (
                        <Board
                            key={id}
                            title={title}
                            tasks={tasks}
                        />
                    );
                })}
                <NewBoardButton projectId={projects[projectIndex].id} />
            </BoardsContainer>
        </div>
    );
}
