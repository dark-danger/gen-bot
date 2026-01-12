"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
    const supabase = await createClient();

    if (!email || !password) {
        return { error: "Please enter email and password" };
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Sign in error:", error);
        return { error: error.message };
    }

    return { error: null };
}

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Sign out error:", error);
        return { error: error.message };
    }

    redirect("/admin/login");
}

export async function getSession() {
    const supabase = await createClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Get session error:", error);
        return { session: null, error: error.message };
    }

    return { session, error: null };
}

export async function getUser() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return { user: null, error: error.message };
    }

    return { user, error: null };
}
