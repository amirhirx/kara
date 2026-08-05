export default function Item({ title }: { title: string }) {
    return <li className={`bg-secondary/50 rounded py-1 px-2`}>{title}</li>;
}
