"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Eye, Clock, Building2 } from "lucide-react";
import type { ContactQuery } from "@/lib/database.types";
import { getContactQueries, updateQueryStatus, deleteContactQuery } from "@/actions";
import { useAdminStore } from "@/store/admin-store";
import { Button, Modal, Card, CardContent, LoadingSpinner } from "@/components/ui";

const statusColors = {
    new: "bg-yellow-500/20 text-yellow-400",
    read: "bg-blue-500/20 text-blue-400",
    responded: "bg-green-500/20 text-green-400",
};

export default function QueriesPage() {
    const { queries, setQueries, queriesLoading, setQueriesLoading, removeQuery, updateQueryStatus: updateLocal } = useAdminStore();
    const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
    const [filter, setFilter] = useState<"all" | "new" | "read" | "responded">("all");

    useEffect(() => {
        const load = async () => {
            setQueriesLoading(true);
            const { data } = await getContactQueries();
            if (data) setQueries(data);
            setQueriesLoading(false);
        };
        load();
    }, [setQueries, setQueriesLoading]);

    const handleView = async (query: ContactQuery) => {
        setSelectedQuery(query);
        if (query.status === "new") {
            await updateQueryStatus(query.id, "read");
            updateLocal(query.id, "read");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this query?")) return;
        await deleteContactQuery(id);
        removeQuery(id);
        if (selectedQuery?.id === id) setSelectedQuery(null);
    };

    const handleUpdateStatus = async (id: string, status: ContactQuery["status"]) => {
        await updateQueryStatus(id, status);
        updateLocal(id, status);
        if (selectedQuery?.id === id) setSelectedQuery({ ...selectedQuery, status });
    };

    const filtered = filter === "all" ? queries : queries.filter((q) => q.status === filter);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contact Queries</h1>
                    <p className="text-dark-400">Manage inquiries from potential partners</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
                {(["all", "new", "read", "responded"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filter === f ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30" : "bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:border-dark-600"}`}>
                        {f} {f !== "all" && `(${queries.filter((q) => q.status === f).length})`}
                    </button>
                ))}
            </div>

            {queriesLoading ? (
                <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
            ) : filtered.length === 0 ? (
                <Card><CardContent className="py-20 text-center text-dark-400">{filter === "all" ? "No queries yet" : `No ${filter} queries`}</CardContent></Card>
            ) : (
                <div className="space-y-4">
                    {filtered.map((query, i) => (
                        <motion.div key={query.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Card className="group hover:border-dark-600 transition-colors">
                                <CardContent className="p-4 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-neon-cyan" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-semibold text-white">{query.name}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[query.status]}`}>{query.status}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-dark-400 mb-2 flex-wrap">
                                            <span>{query.email}</span>
                                            {query.organization && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{query.organization}</span>}
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(query.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-dark-300 text-sm line-clamp-2">{query.message}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleView(query)}><Eye className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(query.id)} className="hover:text-red-400"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal isOpen={!!selectedQuery} onClose={() => setSelectedQuery(null)} title="Query Details" size="lg">
                {selectedQuery && (
                    <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div><label className="text-dark-400 text-sm">Name</label><p className="text-white">{selectedQuery.name}</p></div>
                            <div><label className="text-dark-400 text-sm">Email</label><p className="text-white">{selectedQuery.email}</p></div>
                            {selectedQuery.phone && <div><label className="text-dark-400 text-sm">Phone</label><p className="text-white">{selectedQuery.phone}</p></div>}
                            {selectedQuery.organization && <div><label className="text-dark-400 text-sm">Organization</label><p className="text-white">{selectedQuery.organization}</p></div>}
                        </div>
                        <div><label className="text-dark-400 text-sm">Message</label><p className="text-white whitespace-pre-wrap">{selectedQuery.message}</p></div>
                        <div><label className="text-dark-400 text-sm">Received</label><p className="text-white">{new Date(selectedQuery.created_at).toLocaleString()}</p></div>
                        <div className="flex gap-2 pt-4 border-t border-dark-700">
                            <Button variant={selectedQuery.status === "responded" ? "primary" : "secondary"} size="sm" onClick={() => handleUpdateStatus(selectedQuery.id, "responded")}>Mark Responded</Button>
                            <Button variant="ghost" size="sm" onClick={() => window.open(`mailto:${selectedQuery.email}`)}>Reply via Email</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
