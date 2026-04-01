import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

const variantsClass = {
    primary: "bg-green-500 text-white active:bg-green-600",
    secondary: "bg-blue-400 text-white active:bg-blue-500",
};

export default function Button({ children, variant, ...props }: IButton) {
    const selectedVariants = () => {
        switch (variant) {
            case "primary":
                return variantsClass.primary;
            case "secondary":
                return variantsClass.secondary;
            default:
                return variantsClass.secondary;
        }
    };

    return (
        <button
            {...props}
            className={`${selectedVariants()} font-black md:py-2 md:px-3 p-1.5 rounded-lg transition active:scale-95  flex items-center text-sm select-none`}
        >
            {children}
        </button>
    );
}
