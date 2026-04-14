export default function Overflow({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur">
            <div className="w-11/12 md:w-100 p-4 rounded-xl text-[var(--text-color)] bg-[var(--primary-color)] space-y-2">
                {children}
            </div>
        </div>
    );
}
