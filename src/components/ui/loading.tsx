"use client";

import { motion } from "framer-motion";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                className={`${sizes[size]} border-2 border-dark-600 border-t-neon-cyan rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    {/* Outer ring */}
                    <motion.div
                        className="w-20 h-20 rounded-full border-2 border-dark-700"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full border-2 border-neon-cyan/50"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Core */}
                    <motion.div
                        className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-dark-400 text-sm"
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`bg-dark-800 rounded-lg ${className}`}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-2xl bg-dark-800/50 border border-dark-700/50 p-6 space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}
