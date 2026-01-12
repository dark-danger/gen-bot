"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadImage(
    formData: FormData,
    bucket: string = "images"
) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { url: null, error: "Unauthorized" };
    }

    const file = formData.get("file") as File;

    if (!file) {
        return { url: null, error: "No file provided" };
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
        return { url: null, error: "Invalid file type. Please upload an image." };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { url: null, error: "File too large. Maximum size is 5MB." };
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        console.error("Upload error:", uploadError);
        return { url: null, error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
}

export async function deleteImage(path: string, bucket: string = "images") {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    // Extract the file path from the full URL
    const url = new URL(path);
    const filePath = url.pathname.split(`/${bucket}/`).pop();

    if (!filePath) {
        return { error: "Invalid file path" };
    }

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
        console.error("Delete error:", error);
        return { error: error.message };
    }

    return { error: null };
}
