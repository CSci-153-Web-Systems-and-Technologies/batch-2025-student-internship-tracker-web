"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProjectDTO, CreateTaskDTO } from "@/types";
import { User } from "@supabase/supabase-js";

export async function createProject(payload: CreateProjectDTO) {
    console.log("Creating project with payload:", payload);
    
    const { org_id, name, description, user_id } = payload;

    const supabase = await createClient();

    console.log("org_id value:", org_id);
    
    const { data, error } = await supabase
      .from("projects")
      .insert({
          org_id,
          name,
          description,
          created_by: user_id,
      })
      .select()
      .single();

    if (error) {
        console.error("Supabase insert error:", error);
        throw error;
    }

    console.log("Project created successfully:", data);
    
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
    project_id
  } = payload;

  const supabase = await createClient();
  console.log('Inserting task with assigned_to:', assigned_to);


  const { data, error } = await supabase
    .from("task")
    .insert([
      {
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
      }
    ])
    .select()
    .single();

   if (error) {
    console.error('Supabase error:', error);
    console.error('Full payload:', {
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
    });
    throw error;
  }

  revalidatePath(`/dashboard/${org_id}/projects`);
  return data;
}


export async function getProjectsByOrgId(org_id: string) {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", org_id);

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return projects || [];
}

export async function getTasksByProject(
  projectId: string,
  user: User | null,
  isMentor: boolean,
  org_id: string
) {
  const supabase = await createClient();

  const { data: member, error: memberError } = await supabase
    .from("organization_members")
    .select("id")
    .eq("user_id", user?.id)
    .eq("org_id", org_id)
    .single();

  if (memberError) throw memberError;
  
  let query = supabase
    .from("task")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (!isMentor && user) {
    if (!member?.id) return [];
    query = query.contains("assigned_to", [member.id]);
  }

  const { data: tasks, error } = await query;

  if (error) {
    console.error("Supabase query error:", error);
    throw error;
  }

   return tasks;
}


export async function getMenteeList(org_id: string) {
  const supabase = await createClient();

  const { data: mentees, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("role", "student")
    .eq("org_id", org_id);

  if (error) {
    console.error("Error fetching mentees:", error);
    return [];
  }
  
  return mentees || [];
}

