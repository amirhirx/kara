import { Link } from "react-router-dom";

export default function ProjectCard({
    id,
    title,
    description,
}: {
    id: string;
    title: string;
    description: string;
}) {
    return (
        <Link
            to={`/project/${id}`}
            className="w-full md:w-74 bg-[var(--primary-color)] text-[var(--text-color)] rounded-lg"
        >
            <div className="h-18 py-2 px-4 bg-[var(--secondary-color)]/35 relative">
                <div className="w-18 h-18 rounded-2xl bg-[var(--secondary-color)] absolute -bottom-5"></div>
            </div>
            <div className="pt-6 pb-2 px-4">
                <h2 className="font-bold text-lg line-clamp-1">{title}</h2>
                <p className="text-sm font-light line-clamp-3">{description}</p>
            </div>
        </Link>
    );
}
