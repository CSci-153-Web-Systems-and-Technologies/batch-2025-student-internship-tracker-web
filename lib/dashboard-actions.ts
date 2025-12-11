"use server";

import { createClient } from "@/lib/supabase/server";
import { getProjectsByOrgId, getTasksByProject, getMemberID } from "@/lib/task-actions"
import { getUserProfile } from "@/lib/org-actions";
import type { Project, Task } from "@/types";


export async function getMentorDashboardData(org_id: string) {
  const { user} = await getUserProfile();

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
  const completedTasks = allTasks.filter((t) => t.status === "done").length;
  const activeTasks = allTasks.filter((t) => t.status !== "done").length;
  const pendingReviews = allTasks.filter((t) => t.status === "verifying").length;
  const mentorReviews = allTasks.filter((t) => (t.file_submissions || []).length > 0).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let projectsDone = 0;
  for (const p of projects) {
    const tasks = projectTasksMap[p.id] || [];
    if (tasks.length > 0 && tasks.every((t) => t.status === "done")) projectsDone++;
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
    const completed = tasks.filter((t) => t.status === "done").length;
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
      user,
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
  const { user,isMentor } = await getUserProfile();

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
  const completedTasks = allAssignedTasks.filter((t) => t.status === "done").length;
  const activeTasks = allAssignedTasks.filter((t) => t.status !== "done").length;
  const pendingReviews = allAssignedTasks.filter((t) => t.status === "verifying").length;
  const mentorReviews = allAssignedTasks.filter((t) => (t.file_submissions || []).length > 0).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let projectsDone = 0;
  for (const p of projects) {
    const tasks = projectTasksMap[p.id] || [];
    if (tasks.length > 0 && tasks.every((t) => t.status === "done")) projectsDone++;
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
      const completed = tasks.filter((t) => t.status === "done").length;
      const recent = tasks.slice().sort((a, b) => {
        const at = new Date(a.updated_at || a.created_at || 0).getTime();
        const bt = new Date(b.updated_at || b.created_at || 0).getTime();
        return bt - at;
      });
      return { ...p, completed, total: tasks.length, recent };
    })
    .filter((pc) => pc.total > 0); // only projects where student has tasks

  return {
    ok: true,
    data: {
      org_id: org_id,
      user,
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
