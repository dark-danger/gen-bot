"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Cpu } from "lucide-react";
import type { Project, ProjectInput } from "@/lib/database.types";
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from "@/actions";
import { useAdminStore } from "@/store/admin-store";
import { Button, Input, Textarea, Modal, Card, CardContent, LoadingSpinner } from "@/components/ui";

const categories = ["smart-home", "robotics", "drones", "iot", "ai"] as const;

export default function ProjectsPage() {
    const { projects, setProjects, projectsLoading, setProjectsLoading, addProject, updateProject: updateLocal, removeProject } = useAdminStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState<ProjectInput>({ title: "", description: "", image_url: null, category: "iot" });
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const load = async () => {
            setProjectsLoading(true);
            const { data } = await getProjects();
            if (data) setProjects(data);
            setProjectsLoading(false);
        };
        load();
    }, [setProjects, setProjectsLoading]);

    const openCreate = () => { setEditingProject(null); setFormData({ title: "", description: "", image_url: null, category: "iot" }); setImageFile(null); setModalOpen(true); };
    const openEdit = (p: Project) => { setEditingProject(p); setFormData({ title: p.title, description: p.description, image_url: p.image_url, category: p.category }); setImageFile(null); setModalOpen(true); };

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

        if (editingProject) {
            const { data: updated } = await updateProject(editingProject.id, data);
            if (updated) updateLocal(editingProject.id, updated);
        } else {
            const { data: created } = await createProject(data);
            if (created) addProject(created);
        }
        setSaving(false);
        setModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        await deleteProject(id);
        removeProject(id);
    };

    const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-dark-400">Manage student projects</p>
                </div>
                <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Project</Button>
            </div>

            <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-12" />
            </div>

            {projectsLoading ? (
                <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
            ) : filtered.length === 0 ? (
                <Card><CardContent className="py-20 text-center text-dark-400">{search ? "No projects match your search" : "No projects yet. Add your first project!"}</CardContent></Card>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project, i) => (
                        <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Card className="group">
                                <div className="aspect-video bg-dark-800 relative overflow-hidden">
                                    {project.image_url ? (
                                        <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><Cpu className="w-12 h-12 text-dark-600" /></div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <span className="text-xs px-2 py-1 rounded bg-dark-700 text-dark-300 capitalize mb-2 inline-block">{project.category}</span>
                                    <h3 className="font-semibold text-white mb-1">{project.title}</h3>
                                    <p className="text-dark-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(project)}><Edit2 className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="hover:text-red-400"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? "Edit Project" : "Add Project"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    <Textarea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof formData.category })} className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-600 text-white focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan">
                            {categories.map((c) => (<option key={c} value={c} className="capitalize">{c}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm text-dark-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-dark-700 file:text-white hover:file:bg-dark-600" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={saving}>{editingProject ? "Update" : "Create"}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
