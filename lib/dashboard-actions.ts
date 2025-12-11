"use server";

import { createClient } from "@/lib/supabase/server";
import { getProjectsByOrgId, getTasksByProject, getMemberID } from "@/lib/task-actions"
import { getUserProfile } from "@/lib/org-actions";
import type { Project, Task } from "@/types";
import { Notification } from '../types/index';


export async function notifyUser({user_id,origin,type,title,message}: 
  {user_id: string;origin: string;type: string;title: string; message: string;}) {
  const supabase = await createClient();

  const { error } = await supabase.from("notifications").insert({
    user_id,
    origin,
    type,
    title,
    message,
    is_read: false
  });

  if (error) {
    console.error("Failed to notify user:");
    throw error;
  }
}

export async function getNotification(org_id: string) {
  const supabase = await createClient();
  const { user } = await getUserProfile();

  if (!user) {
    return { error: "User not authenticated", ok: false };
  }

  const member = await getMemberID(user.id, org_id);
  if (!member) {
    return { error: "Missing member", ok: false };
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("org_id", org_id)
    .eq("user_id", member)
    .order("created_at",{ascending:false})
    .limit(5);

  if (error) {
    return { error: error.message, ok: false };
  }

  return { data, ok: true };
}


export async function markAsRead(notification: Notification) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notification.id);

  if (error) {
    console.error("Failed to mark notification as read:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}

export async function getMentorDashboardData(org_id: string) {
  const { user, profile} = await getUserProfile();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const member = await getMemberID(user.id, org_id);

  if (!user || !member) {
    return { error: "Missing user or org", ok: false };
  }

  const projects: Project[] = (await getProjectsByOrgId(org_id)) || [];

  const projectTasksMap: Record<string, Task[]> = {};
  let allTasks: Task[] = [];

  for (const p of projects) {
    const tasks = (await getTasksByProject(p.id, user, true, org_id)) || [];
    projectTasksMap[p.id] = tasks;
    allTasks.push(...tasks);
  }

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.status === "completed").length;
  const activeTasks = allTasks.filter((t) => t.status !== "completed").length;
  const pendingReviews = allTasks.filter((t) => t.status === "verifying").length;
  const mentorReviews = allTasks.filter((t) => (t.file_submissions || []).length > 0).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let projectsDone = 0;
  for (const p of projects) {
    const tasks = projectTasksMap[p.id] || [];
    if (tasks.length > 0 && tasks.every((t) => t.status === "completed")) projectsDone++;
  }

  const recentActivities = allTasks
    .slice()
    .sort((a, b) => {
      const at = new Date(a.updated_at || a.created_at || 0).getTime();
      const bt = new Date(b.updated_at || b.created_at || 0).getTime();
      return bt - at;
    })
    .slice(0, 10);

  const projectCards = projects.map((p) => {
    const tasks = projectTasksMap[p.id] || [];
    const completed = tasks.filter((t) => t.status === "completed").length;
    const recent = tasks.slice().sort((a, b) => {
      const at = new Date(a.updated_at || a.created_at || 0).getTime();
      const bt = new Date(b.updated_at || b.created_at || 0).getTime();
      return bt - at;
    });
    return { ...p, completed, total: tasks.length, recent };
  });

  return {
    ok: true,
    data: {
      org_id: org_id,
      profile,
      metrics: {
        totalTasks,
        completedTasks,
        activeTasks,
        pendingReviews,
        mentorReviews,
        completionRate,
        projectsDone,
        totalProjects: projects.length,
      },
      recentActivities,
      projectCards,
    },
  };
}

export async function getStudentDashboardData(org_id: string) {
  const { user,profile } = await getUserProfile();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const member = await getMemberID(user.id, org_id);
  if (!user || !member) {
    return { error: "Missing user or org", ok: false };
  }

  const memberId = await getMemberID(user.id, org_id);

  const projects: Project[] = (await getProjectsByOrgId(org_id)) || [];

  const projectTasksMap: Record<string, Task[]> = {};
  let allAssignedTasks: Task[] = [];

  for (const p of projects) {
    let tasks = (await getTasksByProject(p.id, user, false, org_id)) || [];
    tasks = tasks.filter((t) => Array.isArray(t.assigned_to) && t.assigned_to.includes(memberId));
    projectTasksMap[p.id] = tasks;
    allAssignedTasks.push(...tasks);
  }

  const totalTasks = allAssignedTasks.length;
  const completedTasks = allAssignedTasks.filter((t) => t.status === "completed").length;
  const activeTasks = allAssignedTasks.filter((t) => t.status !== "completed").length;
  const pendingReviews = allAssignedTasks.filter((t) => t.status === "verifying").length;
  const mentorReviews = allAssignedTasks.filter((t) => (t.mentor_review || []).length > 0).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let projectsDone = 0;
  for (const p of projects) {
    const tasks = projectTasksMap[p.id] || [];
    if (tasks.length > 0 && tasks.every((t) => t.status === "completed")) projectsDone++;
  }

  const recentActivities = allAssignedTasks
    .slice()
    .sort((a, b) => {
      const at = new Date(a.updated_at || a.created_at || 0).getTime();
      const bt = new Date(b.updated_at || b.created_at || 0).getTime();
      return bt - at;
    })
    .slice(0, 10);

  const projectCards = projects
    .map((p) => {
      const tasks = projectTasksMap[p.id] || [];
      const completed = tasks.filter((t) => t.status === "completed").length;
      const recent = tasks.slice().sort((a, b) => {
        const at = new Date(a.updated_at || a.created_at || 0).getTime();
        const bt = new Date(b.updated_at || b.created_at || 0).getTime();
        return bt - at;
      });
      return { ...p, completed, total: tasks.length, recent };
    })
    .filter((pc) => pc.total > 0);

  return {
    ok: true,
    data: {
      org_id: org_id,
      profile,
      memberId,
      metrics: {
        totalTasks,
        completedTasks,
        activeTasks,
        pendingReviews,
        mentorReviews,
        completionRate,
        projectsDone,
        totalProjects: projects.length,
      },
      recentActivities,
      projectCards,
    },
  };
}

