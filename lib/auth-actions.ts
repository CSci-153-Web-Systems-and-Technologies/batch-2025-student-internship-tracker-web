"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error || !authData?.user) {
    return { error: "Invalid username or password." };
  }

  const user = authData.user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/emailconfirm");
  }

  revalidatePath("/", "layout");
  redirect("/organization");
}


export async function signup(formData: FormData) {
  const supabase = await createClient();

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const role = formData.get("role") as string;

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName + " " + lastName}`,
        email: formData.get("email") as string,
        role: role
      },
    },
  };

  const { data: signupData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/emailconfirm")
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/logout");
}
