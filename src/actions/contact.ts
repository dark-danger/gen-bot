"use server";

import { createClient } from "@/lib/supabase/server";
import type { ContactQueryInput, ContactQuery } from "@/lib/database.types";
import { revalidatePath } from "next/cache";

export async function submitContactForm(input: ContactQueryInput) {
    const supabase = await createClient();

    // Validate input
    if (!input.name || !input.email || !input.message) {
        return { data: null, error: "Please fill in all required fields" };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
        return { data: null, error: "Please enter a valid email address" };
    }

    const { data, error } = await supabase
        .from("contact_queries")
        .insert({
            ...input,
            status: "new",
        })
        .select()
        .single();

    if (error) {
        console.error("Error submitting contact form:", error);
        return { data: null, error: "Failed to submit form. Please try again." };
    }

    return { data, error: null };
}

export async function getContactQueries() {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("contact_queries")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching contact queries:", error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function updateQueryStatus(id: string, status: ContactQuery["status"]) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Unauthorized" };
    }

    const { data, error } = await supabase
        .from("contact_queries")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating query status:", error);
        return { data: null, error: error.message };
    }

    revalidatePath("/admin/queries");

    return { data, error: null };
}

export async function deleteContactQuery(id: string) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase.from("contact_queries").delete().eq("id", id);

    if (error) {
        console.error("Error deleting contact query:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/queries");

    return { error: null };
}
