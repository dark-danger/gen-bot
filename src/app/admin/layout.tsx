"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Cpu,
} from "lucide-react";
import { signOut } from "@/actions";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/queries", label: "Queries", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleSignOut = async () => {
        await signOut();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Mobile header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-dark-900/90 backdrop-blur-xl border-b border-dark-800/50 flex items-center justify-between px-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-dark-900" />
                    </div>
                    <span className="font-bold text-white">GenBots Admin</span>
                </Link>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-dark-400 hover:text-white">
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-dark-900 border-r border-dark-800/50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-800/50">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-dark-900" />
                    </div>
                    <span className="font-bold text-white">GenBots Admin</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "text-dark-400 hover:text-white hover:bg-dark-800"}`}>
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800/50">
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8">
                    {children}
                </motion.div>
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && <div className="lg:hidden fixed inset-0 z-20 bg-dark-950/80" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
}
