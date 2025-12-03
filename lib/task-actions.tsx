"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function  createProject({
    org_id,name,description,user_id,}
    :{org_id:string,name: string, description: string, user_id: string}) {

        const supabase = await createClient();

        const {data, error} = await supabase
        .from("projects")
        .insert({
            org_id,
            name,
            description,
            created_by: user_id,
        })
        .select()
        .single();

    revalidatePath(`/dashboard/${org_id}/projects`);
    return data;
    
}

export async function createTask({
  org_id,
  project_id,
  title,
  description,
  type,
  priority,
  status,
  assigned_to,
  due_date,
  user_id,
}: {
  org_id: string;
  project_id: string;
  title: string;
  description: string;
  type: "bug" | "documentation" | "feature" | "refactor";
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "verifying" | "cancelled" | "completed";
  assigned_to: string;
  due_date: string;
  user_id: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      org_id,
      project_id,
      title,
      description,
      type,
      priority,
      status,
      assigned_to,
      due_date,
      created_by: user_id,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/dashboard/${org_id}/projects`);
  return data;
}