"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProjectDTO, CreateTaskDTO,UploadOptions, UploadResponse } from "@/types";
import { User } from "@supabase/supabase-js";
import { notifyUser } from "./dashboard-actions";

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

    const { data: members } = await supabase
      .from("organization_members")
      .select("id")
      .eq("org_id", org_id);

    for (const m of members || []) {
      if (!m.id) continue;
      
      await notifyUser({
        user_id: m.id,
        origin: `/dashboard/${org_id}/projects/${data.id}`,
        type: "project_created",
        title: "New Project",
        message: `${name} has been created`
      });
    }
    
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

    const { data: members } = await supabase
      .from("organization_members")
      .select("id")
      .in("id", assigned_to);
    
     for (const m of members ?? []) {
      if (!m.id) continue;

      await notifyUser({
        user_id: m.id,
        origin: `/dashboard/${org_id}/projects/${project_id}`,
        type: "task_assigned",
        title: "New Task Assigned",
        message: `You have been assigned to: ${title}`
      });
    }

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

export async function uploadStudentSubmission({
  file,
  bucketId = "student_submissions",
  folderPath = "",
  task_id,
}: {
  file: File;
  bucketId?: string;
  folderPath?: string;
  task_id: string;
}) {
  const supabase = await createClient();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    const userId = session.user.id;

    const { data: taskData, error: taskError } = await supabase
      .from("task")
      .select("id, assigned_to, file_submissions, status, org_id")
      .eq("id", task_id)
      .single();

    if (taskError || !taskData) {
      return { success: false, error: taskError?.message || "Task not found" };
    }

    const { data: orgMember } = await supabase
      .from("organization_members")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    const isAssigned = taskData.assigned_to?.includes(orgMember?.id);

    if (!isAssigned) {
      return { success: false, error: "You are not assigned to this task" };
    }

    if (!file) return { success: false, error: "No file provided" };


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
        metadata: { task_id },
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const newFiles = [...(taskData.file_submissions || []), filePath];

    const { error: updateError } = await supabase
      .from("task")
      .update({
        file_submissions: newFiles,
        status: "verifying",
      })
      .eq("id", task_id);

    if (updateError) {
      return { success: false, error: updateError.message };
    }


    const { data: urlData } = supabase.storage
      .from(bucketId)
      .getPublicUrl(filePath);

    //notify mentors
    const { data: mentors } = await supabase
      .from("organization_members")
      .select("id")
      .eq("org_id", taskData.org_id)
      .eq("role", "mentor");

    for (const m of mentors||[]) {
      await notifyUser({
        user_id: m.id,
        origin: `/dashboard/${taskData.org_id}/tasks/${task_id}`,
        type: "submission_uploaded",
        title: "New Submission",
        message: `A student has submitted their task: ${task_id}`
      });
    }
      
    return {
      success: true,
      data: { path: filePath, publicUrl: urlData.publicUrl },
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}


export async function removeStudentSubmission(taskId: string, fileToDelete: string) {
  const supabase = await createClient();

  const { data: task, error: taskError } = await supabase
    .from("task")
    .select("file_submissions")
    .eq("id", taskId)
    .single();

  if (taskError) {
    return { success: false, message: "Task not found.", error: taskError.message };
  }

  const submissions: string[] = task?.file_submissions ?? [];

  if (!submissions.includes(fileToDelete)) {
    return {
      success: false,
      message: "The specified file does not exist in this task.",
    };
  }

  const { error: storageError } = await supabase.storage
    .from("student_submissions")
    .remove([fileToDelete]);

  if (storageError) {
    return {
      success: false,
      message: "Failed to delete file from storage",
      error: storageError.message,
    };
  }

  const updatedList = submissions.filter((path) => path !== fileToDelete);

  const { error: updateError } = await supabase
    .from("task")
    .update({ file_submissions: updatedList })
    .eq("id", taskId);

  if (updateError) {
    return {
      success: false,
      message: "File deleted but failed to update task.",
      error: updateError.message,
    };
  }

  return {
    success: true,
    message: "Submission successfully removed.",
  };
}


export async function reviewSubmission(task_id:string,IsApproved:boolean, comment:string){
  const supabase = await createClient();
  let newStatus: string;
  try{
    if(IsApproved === true){
      newStatus = "completed";
    }
    else if(IsApproved === false){
      newStatus = "revise";
    } else{
      throw new Error("Invalid action");
    }

    const { data, error } = await supabase
      .from("task")
      .update({
        status: newStatus,
        mentor_review: comment,
      })
      .eq("id", task_id)
      .select()
      .single();

    if (error) throw error;
    
    const { data: taskInfo} = await supabase
      .from("task")
      .select("assigned_to")
      .eq("id", task_id)
      .single();
    if (!taskInfo) {
      throw new Error("Task not found");
    }
    const { data: students } = await supabase
      .from("organization_members")
      .select("id")
      .in("id", taskInfo.assigned_to );

    for (const s of students ?? []) {
      await notifyUser({
        user_id: s.id,
        origin: `/dashboard/tasks/${task_id}`,
        type: "task_reviewed",
        title: IsApproved ? "Task Approved" : "Task Requires Changes",
        message: comment
      });
    }
    return { success: true, data };
  }catch(error:any){
    console.error("[reviewSubmission] Error:", error);
    return { success: false, error: error.message };
  }
  
}
