"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, Users, MessageSquare, Clock, ArrowRight, Bell } from "lucide-react";
import type { ContactQuery } from "@/lib/database.types";
import { Card, CardContent, CardHeader } from "@/components/ui";

interface DashboardClientProps {
    projectsCount: number;
    teamCount: number;
    queriesCount: number;
    newQueriesCount: number;
    recentQueries: ContactQuery[];
}

const stats = (p: number, t: number, q: number, n: number) => [
    { label: "Projects", value: p, icon: FolderKanban, href: "/admin/projects", color: "from-neon-cyan to-cyan-600" },
    { label: "Team Members", value: t, icon: Users, href: "/admin/team", color: "from-neon-blue to-blue-600" },
    { label: "Total Queries", value: q, icon: MessageSquare, href: "/admin/queries", color: "from-neon-purple to-purple-600" },
    { label: "New Queries", value: n, icon: Bell, href: "/admin/queries", color: "from-yellow-500 to-orange-500" },
];

export function DashboardClient({ projectsCount, teamCount, queriesCount, newQueriesCount, recentQueries }: DashboardClientProps) {
    const statItems = stats(projectsCount, teamCount, queriesCount, newQueriesCount);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-dark-400">Welcome to your GenBots admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statItems.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Link href={stat.href}>
                            <Card className="group cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-dark-600 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-dark-400 text-sm">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Queries */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Recent Queries</h2>
                        <Link href="/admin/queries" className="text-sm text-neon-cyan hover:underline">View all</Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentQueries.length === 0 ? (
                            <div className="p-6 text-center text-dark-400">No queries yet</div>
                        ) : (
                            <div className="divide-y divide-dark-800/50">
                                {recentQueries.map((query) => (
                                    <div key={query.id} className="px-6 py-4 flex items-center justify-between hover:bg-dark-800/30 transition-colors">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-white truncate">{query.name}</span>
                                                {query.status === "new" && <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">New</span>}
                                            </div>
                                            <p className="text-dark-400 text-sm truncate">{query.message}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-dark-500 text-xs ml-4">
                                            <Clock className="w-3 h-3" />
                                            {new Date(query.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
