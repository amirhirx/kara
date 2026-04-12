import { useDispatch, useSelector } from "react-redux";
import { Button, ProjectCard, ProjectCardContainer } from "../components";
import type { RooteState } from "../contexts/store";
import { newProject } from "../contexts/projectsSlice";

export default function Home() {
    const dispatch = useDispatch();
    const projects = useSelector(
        (state: RooteState) => state.projects.projects,
    );

    const createNewProject = () => {
        const title = prompt("Enter project title:") || "";
        const description = prompt("Enter project description:") || "";
        if (title?.length >= 3) {
            dispatch(
                newProject({
                    title: title,
                    description: description,
                }),
            );
        } else {
            alert("Your title must be more 3 characters");
        }
    };
    return (
        <div className="space-y-2 pt-2">
            <div className="w-11/12 mx-auto px-2">
                <Button onClick={createNewProject}>پروژه جدید</Button>
            </div>
            <ProjectCardContainer>
                {projects.map(({ id, title, description }) => {
                    return (
                        <ProjectCard
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                        />
                    );
                })}
            </ProjectCardContainer>
        </div>
    );
}
