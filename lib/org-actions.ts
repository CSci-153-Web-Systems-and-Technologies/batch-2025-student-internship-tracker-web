"use server";
import { createClient } from "./supabase/server";
import { redirect} from "next/navigation";

export async function getUserProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { user: null, profile: null, isMentor: false };

    const { data: profile } = await supabase
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

    const { user, isMentor } = await getUserProfile();
    if (!user){
        throw new Error("Not authenticated");
    }
    if (!isMentor){
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

    if (error) throw error;

    await supabase
        .from("organization_members")
        .insert({
            org_id: organization.id,
            user_id: user.id,
            role: "mentor"
        });

    redirect("/organization");
}

export async function JoinOrganization(formData: FormData) {
    const inviteCode = formData.get("inviteCode") as string;

    if (!inviteCode) {
        throw new Error("Invite code is missing");
    }

    const supabase = await createClient();
    const { user, isMentor } = await getUserProfile();

    

    if (!user) throw new Error("Not authenticated");

    const { data: org, error: orgError } = await supabase
        .from("organizations")
        .select("id")
        .eq("invite_code", inviteCode)
        .single();
    
    if(orgError || !org) throw new Error("Invalid invite code");

    const { error: memberError } = await supabase
        .from("organization_members")
        .insert({
            org_id: org.id,
            user_id: user.id,
            role: isMentor ? "mentor":"student"
    });

    if (memberError) {
        console.error(memberError);
        throw new Error("Could not join organization");
    }


    redirect("/organization");
}

