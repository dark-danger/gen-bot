// Database types for GenBots platform
// These types mirror the Supabase database schema

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    category: 'smart-home' | 'robotics' | 'drones' | 'iot' | 'ai';
    created_at: string;
    updated_at: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image_url: string | null;
    bio: string | null;
    order_index: number;
    created_at: string;
}

export interface ContactQuery {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    organization: string | null;
    message: string;
    status: 'new' | 'read' | 'responded';
    created_at: string;
}

// Form input types (without auto-generated fields)
export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type TeamMemberInput = Omit<TeamMember, 'id' | 'created_at'>;
export type ContactQueryInput = Omit<ContactQuery, 'id' | 'created_at' | 'status'>;

// Database schema type for Supabase client
export interface Database {
    public: {
        Tables: {
            projects: {
                Row: Project;
                Insert: ProjectInput & { id?: string };
                Update: Partial<ProjectInput>;
            };
            team_members: {
                Row: TeamMember;
                Insert: TeamMemberInput & { id?: string };
                Update: Partial<TeamMemberInput>;
            };
            contact_queries: {
                Row: ContactQuery;
                Insert: ContactQueryInput & { id?: string };
                Update: Partial<ContactQuery>;
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
