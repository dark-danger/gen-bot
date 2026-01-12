"use client";

import { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    type = "button",
    onClick,
}: ButtonProps) {
    const baseStyles =
        "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
        primary:
            "bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-900 hover:shadow-glow focus:ring-neon-cyan",
        secondary:
            "bg-dark-700 text-white border border-dark-600 hover:bg-dark-600 hover:border-neon-cyan/50 focus:ring-dark-500",
        ghost:
            "bg-transparent text-dark-300 hover:text-neon-cyan hover:bg-dark-800/50 focus:ring-dark-600",
        danger:
            "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
    };

    const isDisabled = disabled || isLoading;

    return (
        <motion.button
            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isDisabled}
            type={type}
            onClick={onClick}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </motion.button>
    );
}
