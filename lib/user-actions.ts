import { createClient } from "./supabase/server";

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