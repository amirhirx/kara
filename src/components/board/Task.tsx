export default function Item({ title }: { title: string }) {
    return (
        <li className={`bg-[var(--secondary-color)]/50 rounded py-1 px-2`}>
            {title}
        </li>
    );
}
