import { Link } from "react-router-dom";

export default function ProjectCard({
    id,
    title,
    description,
    emojie,
}: {
    id: string;
    title: string;
    description: string;
    emojie: string;
}) {
    return (
        <Link
            to={`/project/${id}`}
            className="w-full md:w-74 bg-primary text-text rounded-lg shadow-lg"
            draggable
        >
            <div className="h-18 py-12 px-4 bg-secondary/35 relative">
                <div className="w-18 h-18 rounded-2xl bg-secondary absolute -bottom-5 p-1 flex items-center justify-center shadow-xl">
                    <span className="text-5xl font-black select-none">
                        {emojie}
                    </span>
                </div>
            </div>
            <div className="pt-6 pb-4 px-4 h-28">
                <h2 className="font-bold text-xl line-clamp-1">{title}</h2>
                <p className="text-sm line-clamp-2">{description}</p>
            </div>
        </Link>
    );
}
