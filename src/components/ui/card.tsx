"use client";

import { ReactNode, MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({
    children,
    className = "",
    hover = true,
    glow = false,
    onClick,
}: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={hover ? { y: -5, scale: 1.01 } : {}}
            onClick={onClick}
            className={`
        relative rounded-2xl overflow-hidden
        bg-gradient-to-br from-dark-800/80 to-dark-900/80
        backdrop-blur-xl border border-dark-700/50
        ${glow ? "shadow-glow" : "shadow-xl"}
        ${hover ? "transition-shadow duration-300 hover:shadow-glow hover:border-neon-cyan/30" : ""}
        ${className}
      `}
        >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            {children}
        </motion.div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
    return (
        <div className={`px-6 py-4 border-b border-dark-700/50 ${className}`}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
    return (
        <div className={`px-6 py-4 border-t border-dark-700/50 ${className}`}>
            {children}
        </div>
    );
}
