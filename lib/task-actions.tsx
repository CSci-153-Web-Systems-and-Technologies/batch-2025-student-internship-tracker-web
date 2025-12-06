"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProjectDTO, CreateTaskDTO } from "@/types";

export async function  createProject(payload: CreateProjectDTO) {
    const { org_id, name, description, user_id } = payload;

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

export async function createTask(payload: CreateTaskDTO) {
  const {
    org_id,
    title,
    description,
    type,
    priority,
    status,
    assigned_to,
    created_by,
    due_date,
    project_id} = payload;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      org_id,
      title,
      description,
      type,
      priority,
      status,
      assigned_to,
      created_by,
      due_date,
      project_id,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/dashboard/${org_id}/projects`);
  return data;
}