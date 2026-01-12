"use client";

import { create } from "zustand";
import type { Project, TeamMember, ContactQuery } from "@/lib/database.types";

interface AdminState {
    // Projects
    projects: Project[];
    projectsLoading: boolean;
    setProjects: (projects: Project[]) => void;
    setProjectsLoading: (loading: boolean) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;

    // Team Members
    teamMembers: TeamMember[];
    teamLoading: boolean;
    setTeamMembers: (members: TeamMember[]) => void;
    setTeamLoading: (loading: boolean) => void;
    addTeamMember: (member: TeamMember) => void;
    updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
    removeTeamMember: (id: string) => void;

    // Contact Queries
    queries: ContactQuery[];
    queriesLoading: boolean;
    setQueries: (queries: ContactQuery[]) => void;
    setQueriesLoading: (loading: boolean) => void;
    removeQuery: (id: string) => void;
    updateQueryStatus: (id: string, status: ContactQuery["status"]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    // Projects state
    projects: [],
    projectsLoading: false,
    setProjects: (projects) => set({ projects }),
    setProjectsLoading: (projectsLoading) => set({ projectsLoading }),
    addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
    updateProject: (id, updates) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === id ? { ...p, ...updates } : p
            ),
        })),
    removeProject: (id) =>
        set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
        })),

    // Team Members state
    teamMembers: [],
    teamLoading: false,
    setTeamMembers: (teamMembers) => set({ teamMembers }),
    setTeamLoading: (teamLoading) => set({ teamLoading }),
    addTeamMember: (member) =>
        set((state) => ({ teamMembers: [...state.teamMembers, member] })),
    updateTeamMember: (id, updates) =>
        set((state) => ({
            teamMembers: state.teamMembers.map((m) =>
                m.id === id ? { ...m, ...updates } : m
            ),
        })),
    removeTeamMember: (id) =>
        set((state) => ({
            teamMembers: state.teamMembers.filter((m) => m.id !== id),
        })),

    // Queries state
    queries: [],
    queriesLoading: false,
    setQueries: (queries) => set({ queries }),
    setQueriesLoading: (queriesLoading) => set({ queriesLoading }),
    removeQuery: (id) =>
        set((state) => ({
            queries: state.queries.filter((q) => q.id !== id),
        })),
    updateQueryStatus: (id, status) =>
        set((state) => ({
            queries: state.queries.map((q) => (q.id === id ? { ...q, status } : q)),
        })),
}));
