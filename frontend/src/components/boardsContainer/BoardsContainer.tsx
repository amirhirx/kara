export default function BoardsContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-11/12 mx-auto flex items-start gap-4 p-4">
            {children}
        </div>
    );
}
