"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className={`w-full ${sizes[size]} mx-auto`}
                        >
                            <div className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50 shadow-2xl overflow-hidden">
                                {/* Header */}
                                {title && (
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700/50">
                                        <h2 className="text-lg font-semibold text-white">{title}</h2>
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">{children}</div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
