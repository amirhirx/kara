import Overflow from "../overflow/Overflow";
import Button from "../ui/button/Button";

export default function MessageDialog({
    title,
    description,
    closeHandler,
}: {
    title: string;
    description?: string;
    closeHandler: () => void;
}) {
    return (
        <Overflow>
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
            {description && <p className="text-sm">{description}</p>}
            <div className="flex justify-end items-center">
                <Button onClick={closeHandler}>باشه</Button>
            </div>
        </Overflow>
    );
}
