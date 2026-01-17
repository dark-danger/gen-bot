"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`min-h-screen ${className}`}
        >
            {children}
        </motion.main>
    );
}

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    return (
        <section
            id={id}
            className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
        >
            <div className="max-w-7xl mx-auto">{children}</div>
        </section>
    );
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    centered = true,
    className = "",
}: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mb-12 lg:mb-16 ${centered ? "text-center" : ""} ${className}`}
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-tech italic">
                <span className="bg-gradient-to-r from-white via-dark-200 to-dark-400 bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>
            {subtitle && (
                <p className="text-dark-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
        </motion.div>
    );
}
