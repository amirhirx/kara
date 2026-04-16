export default function ProjectCardContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-11/12 mx-auto p-2 grid md:grid-cols-4 gap-2">
            {children}
        </section>
    );
}
