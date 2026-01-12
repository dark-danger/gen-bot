"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Home, Bot, Plane, Cpu, Brain } from "lucide-react";
import type { Project } from "@/lib/database.types";
import { Card, CardContent, Modal } from "@/components/ui";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";

const categories = [
    { id: "all", label: "All Projects", icon: null },
    { id: "smart-home", label: "Smart Home", icon: Home },
    { id: "robotics", label: "Robotics", icon: Bot },
    { id: "drones", label: "Drones", icon: Plane },
    { id: "iot", label: "IoT", icon: Cpu },
    { id: "ai", label: "AI", icon: Brain },
];

// Demo projects when database is empty
const demoProjects: Project[] = [
    {
        id: "1",
        title: "Smart Classroom System",
        description: "An IoT-based system that automates classroom lighting, temperature, and attendance tracking using sensors and cloud connectivity.",
        image_url: null,
        category: "smart-home",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Line Following Robot",
        description: "An autonomous robot that follows a black line using IR sensors and PID control algorithm, built by Grade 8 students.",
        image_url: null,
        category: "robotics",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Weather Monitoring Drone",
        description: "A custom-built drone equipped with environmental sensors to collect atmospheric data for weather analysis.",
        image_url: null,
        category: "drones",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "4",
        title: "Smart Irrigation System",
        description: "An AI-powered irrigation system that optimizes water usage based on soil moisture, weather forecasts, and plant requirements.",
        image_url: null,
        category: "ai",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "5",
        title: "Home Security Hub",
        description: "A centralized IoT hub that connects door sensors, cameras, and alarms for comprehensive home security monitoring.",
        image_url: null,
        category: "iot",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "6",
        title: "Obstacle Avoidance Robot",
        description: "A mobile robot with ultrasonic sensors that navigates complex environments while avoiding obstacles autonomously.",
        image_url: null,
        category: "robotics",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

interface ProjectsGridProps {
    initialProjects: Project[];
}

export function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
    const projects = initialProjects.length > 0 ? initialProjects : demoProjects;
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    const getCategoryIcon = (category: string) => {
        const cat = categories.find((c) => c.id === category);
        return cat?.icon || Cpu;
    };

    return (
        <PageWrapper>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
                <div className="absolute inset-0 grid-pattern opacity-30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Student <span className="gradient-text">Projects</span>
                        </h1>
                        <p className="text-lg text-dark-400 max-w-3xl mx-auto">
                            Explore innovative projects built by students across our partner
                            schools. From smart homes to autonomous robots.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <Section>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30"
                                    : "bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:border-dark-600"
                                }`}
                        >
                            {category.icon && <category.icon className="w-4 h-4" />}
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const CategoryIcon = getCategoryIcon(project.category);
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card
                                        className="h-full cursor-pointer group"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className="aspect-video relative bg-dark-800 overflow-hidden">
                                            {project.image_url ? (
                                                <Image
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                                                    <CategoryIcon className="w-16 h-16 text-dark-600" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-10 h-10 rounded-full bg-neon-cyan flex items-center justify-center">
                                                    <ExternalLink className="w-5 h-5 text-dark-900" />
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2.5 py-1 rounded-lg bg-dark-700/50 text-xs text-dark-300 capitalize">
                                                    {project.category.replace("-", " ")}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-dark-400 text-sm line-clamp-2">
                                                {project.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-dark-400">No projects found in this category.</p>
                    </div>
                )}
            </Section>

            {/* Project Modal */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                size="lg"
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <div>
                        <div className="aspect-video relative bg-dark-800 rounded-xl overflow-hidden mb-6">
                            {selectedProject.image_url ? (
                                <Image
                                    src={selectedProject.image_url}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
                                    {(() => {
                                        const Icon = getCategoryIcon(selectedProject.category);
                                        return <Icon className="w-20 h-20 text-dark-600" />;
                                    })()}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1.5 rounded-lg bg-neon-cyan/10 text-sm text-neon-cyan capitalize">
                                {selectedProject.category.replace("-", " ")}
                            </span>
                        </div>
                        <p className="text-dark-300 leading-relaxed">
                            {selectedProject.description}
                        </p>
                    </div>
                )}
            </Modal>
        </PageWrapper>
    );
}
