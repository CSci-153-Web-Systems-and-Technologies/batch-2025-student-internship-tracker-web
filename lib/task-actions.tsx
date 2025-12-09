"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProjectDTO, CreateTaskDTO,UploadOptions, UploadResponse } from "@/types";
import { User } from "@supabase/supabase-js";
import { metadata } from '../app/layout';

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

export async function getMemberID(user_id: string, org_id: string) {
  const supabase = await createClient();

  const { data: member, error } = await supabase
    .from("organization_members")
    .select("id")
    .eq("user_id", user_id)
    .eq("org_id", org_id)
    .single(); 

  if (error) {
    console.error("Error fetching member ID:", error);
    throw error;
  }

  return member?.id ?? null;
}

export async function getTasksByProject(
  projectId: string,
  user: User | null,
  isMentor: boolean,
  org_id: string
) {
  const supabase = await createClient();

  let memberId: string | null = null;

  if (user) {
    try {
      memberId = await getMemberID(user.id, org_id);
    } catch (err) {
      console.error("Failed to get member ID:", err);
      throw err;
    }
  }
  
  let query = supabase
    .from("task")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (!isMentor && memberId) {
    query = query.contains("assigned_to", [memberId]);
  }

  //If user is not mentor and not a member
  if (!isMentor && !memberId) {
    return [];
  }

  const { data: tasks, error } = await query;

  if (error) {
    console.error("Supabase query error:", error);
    throw error;
  }

   return tasks;
}

export async function getProjectsById(project_id:string){
  const supabase = await createClient();

  const{data:project, error} = await supabase
    .from("projects")
    .select("*")
    .eq("id",project_id)
    .single()

  if(error){
    console.error("Error fetching task details:", error);
    return null;
  }

  return project;
}

export async function getTaskByID(task_id:string){
  const supabase = await createClient();

  const {data:task, error} = await supabase
    .from("task")
    .select("*")
    .eq("id", task_id)
    .single()

  if(error){
    console.error("Error fetching task details:", error);
    return null;
  }

  return task;
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

export async function uploadStudentSubmission(
  { file, bucketId = "student_submissions", folderPath = "", metadata = {} }: UploadOptions
): Promise<UploadResponse> {
  const supabase = await createClient();

  try {
    if (!file) {
      return { success: false, error: "No file provided." };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const filePath =
      folderPath && folderPath.length > 0
        ? `${folderPath}/${fileName}`
        : fileName;


    const { error: uploadError } = await supabase.storage
      .from(bucketId)
      .upload(filePath, file, {
        upsert: false,
        metadata,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { success: false, error: uploadError.message };
    }

    if (metadata.task_id) {
      const { data: task, error: fetchError } = await supabase
        .from("task")
        .select("file_submissions")
        .eq("id", metadata.task_id)
        .single();

      if (fetchError) {
        console.error("Error fetching task:", fetchError);
        return { success: false, error: fetchError.message };
      }

      const currentFiles = task?.file_submissions || [];


      const newFiles = [...currentFiles, filePath];


      const { error: updateError } = await supabase
        .from("task")
        .update({ file_submissions: newFiles })
        .eq("id", metadata.task_id);

      if (updateError) {
        console.error("Error updating task:", updateError);
        return { success: false, error: updateError.message };
      }
    }


    const { data: urlData } = supabase.storage
      .from(bucketId)
      .getPublicUrl(filePath);

    return {
      success: true,
      data: {
        path: filePath,
        publicUrl: urlData.publicUrl,
      },
    };
  } catch (err: any) {
    console.error("Unexpected upload error:", err);
    return { success: false, error: err.message || "Unexpected error" };
  }
}

export async function removeStudentSubmission(taskId: string) {
  const supabase = await createClient();


  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("file_submissions")
    .eq("id", taskId)
    .single();

  if (taskError) {
    throw new Error("Task not found: " + taskError.message);
  }

  const filePath = task?.file_submissions?.[0];

  if (!filePath) {
    return { success: false, message: "No submission file found." };
  }

  const { error: storageError } = await supabase.storage
    .from("student_submissions")
    .remove([filePath]);

  if (storageError) {
    throw new Error("Failed to delete file: " + storageError.message);
  }

  const { error: updateError } = await supabase
    .from("tasks")
    .update({
      file_submissions: [], 
    })
    .eq("id", taskId);

  if (updateError) {
    throw new Error("Failed to update task: " + updateError.message);
  }

  return { success: true };
}
