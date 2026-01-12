"use server";

import { createClient } from "@/lib/supabase/server";
import type { TeamMemberInput } from "@/lib/database.types";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching team members:", error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function getTeamMemberById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching team member:", error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function createTeamMember(input: TeamMemberInput) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("team_members")
        .insert(input)
        .select()
        .single();

    if (error) {
        console.error("Error creating team member:", error);
        return { data: null, error: error.message };
    }

    revalidatePath("/about");
    revalidatePath("/admin/team");

    return { data, error: null };
}

export async function updateTeamMember(id: string, input: Partial<TeamMemberInput>) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("team_members")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating team member:", error);
        return { data: null, error: error.message };
    }

    revalidatePath("/about");
    revalidatePath("/admin/team");

    return { data, error: null };
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase.from("team_members").delete().eq("id", id);

    if (error) {
        console.error("Error deleting team member:", error);
        return { error: error.message };
    }

    revalidatePath("/about");
    revalidatePath("/admin/team");

    return { error: null };
}
