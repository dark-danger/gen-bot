"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, User } from "lucide-react";
import type { TeamMember, TeamMemberInput } from "@/lib/database.types";
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, uploadImage } from "@/actions";
import { useAdminStore } from "@/store/admin-store";
import { Button, Input, Textarea, Modal, Card, CardContent, LoadingSpinner } from "@/components/ui";

export default function TeamPage() {
    const { teamMembers, setTeamMembers, teamLoading, setTeamLoading, addTeamMember, updateTeamMember: updateLocal, removeTeamMember } = useAdminStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState<TeamMemberInput>({ name: "", role: "", image_url: null, bio: null, order_index: 0 });
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const load = async () => {
            setTeamLoading(true);
            const { data } = await getTeamMembers();
            if (data) setTeamMembers(data);
            setTeamLoading(false);
        };
        load();
    }, [setTeamMembers, setTeamLoading]);

    const openCreate = () => { setEditingMember(null); setFormData({ name: "", role: "", image_url: null, bio: null, order_index: teamMembers.length }); setImageFile(null); setModalOpen(true); };
    const openEdit = (m: TeamMember) => { setEditingMember(m); setFormData({ name: m.name, role: m.role, image_url: m.image_url, bio: m.bio, order_index: m.order_index }); setImageFile(null); setModalOpen(true); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        let imageUrl = formData.image_url;

        if (imageFile) {
            const fd = new FormData();
            fd.append("file", imageFile);
            const { url } = await uploadImage(fd, "images");
            if (url) imageUrl = url;
        }

        const data = { ...formData, image_url: imageUrl };

        if (editingMember) {
            const { data: updated } = await updateTeamMember(editingMember.id, data);
            if (updated) updateLocal(editingMember.id, updated);
        } else {
            const { data: created } = await createTeamMember(data);
            if (created) addTeamMember(created);
        }
        setSaving(false);
        setModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this team member?")) return;
        await deleteTeamMember(id);
        removeTeamMember(id);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Team Members</h1>
                    <p className="text-dark-400">Manage your team</p>
                </div>
                <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Member</Button>
            </div>

            {teamLoading ? (
                <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
            ) : teamMembers.length === 0 ? (
                <Card><CardContent className="py-20 text-center text-dark-400">No team members yet. Add your first member!</CardContent></Card>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamMembers.map((member, i) => (
                        <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-dark-800 overflow-hidden mb-4 relative">
                                        {member.image_url ? (
                                            <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center"><User className="w-10 h-10 text-dark-600" /></div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                                    <p className="text-neon-cyan text-sm mb-2">{member.role}</p>
                                    {member.bio && <p className="text-dark-400 text-xs line-clamp-2 mb-4">{member.bio}</p>}
                                    <div className="flex justify-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(member)}><Edit2 className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)} className="hover:text-red-400"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingMember ? "Edit Member" : "Add Member"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    <Input label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
                    <Textarea label="Bio (optional)" value={formData.bio || ""} onChange={(e) => setFormData({ ...formData, bio: e.target.value || null })} />
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Photo</label>
                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm text-dark-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-dark-700 file:text-white hover:file:bg-dark-600" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={saving}>{editingMember ? "Update" : "Create"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
