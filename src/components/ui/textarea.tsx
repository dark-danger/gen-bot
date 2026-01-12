"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", label, error, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-dark-300 mb-2"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    className={`
            w-full px-4 py-3 rounded-xl
            bg-dark-800/50 border border-dark-600
            text-white placeholder-dark-400
            focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan
            transition-all duration-300
            hover:border-dark-500
            resize-none min-h-[120px]
            ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
