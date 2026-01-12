"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProjectInput } from "@/lib/database.types";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function getProjectById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching project:", error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function createProject(input: ProjectInput) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("projects")
        .insert(input)
        .select()
        .single();

    if (error) {
        console.error("Error creating project:", error);
        return { data: null, error: error.message };
    }

    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return { data, error: null };
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("projects")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating project:", error);
        return { data: null, error: error.message };
    }

    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return { data, error: null };
}

export async function deleteProject(id: string) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
        console.error("Error deleting project:", error);
        return { error: error.message };
    }

    revalidatePath("/projects");
    revalidatePath("/admin/projects");

    return { error: null };
}
