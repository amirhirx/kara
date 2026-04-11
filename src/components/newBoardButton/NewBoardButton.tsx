import { PlusIcon } from "@heroicons/react/16/solid";

export default function NewBoardButton() {
    return (
        <button className="w-60 bg-[var(--primary-color)] text-[var(--text-color)] py-2.5 px-4 rounded-lg text-sm font-semibold flex gap-1 justify-center items-center opacity-75 hover:opacity-100 transition active:scale-95">
            افزودن لیست جدید
            <PlusIcon className="w-5" />
        </button>
    );
}
