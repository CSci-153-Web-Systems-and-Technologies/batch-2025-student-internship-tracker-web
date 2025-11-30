"use server";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export async function getUserProfile() {
    const supabase = await createClient();
    const { data: {user} } = await supabase.auth.getUser();

    if (!user) {
        if (!user) return { user: null, profile: null, isMentor: false };
    }

    const {data: profile} = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

      
    const isMentor = profile?.role === "mentor";
    return { user, profile, isMentor };
}

export async function CreateOrganization(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "mentor") {
        throw new Error("Only mentors can create an organization");
    }

    const invite_code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { data: organization, error } = await supabase
        .from("organizations")
        .insert({
            name,
            description,
            invite_code,
            created_by: user.id
        })
        .select()
        .single();

    if (error) {
        console.error("ORG INSERT ERROR:", error);
        throw error;
    }

    await supabase
        .from("organization_members")
        .insert({
            org_id: organization.id,
            user_id: user.id,
            role: "mentor"
        });

    redirect("/organization");
}
