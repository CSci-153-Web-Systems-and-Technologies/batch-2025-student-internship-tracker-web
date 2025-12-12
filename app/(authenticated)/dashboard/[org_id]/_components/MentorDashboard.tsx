import MetricsBar from "./MetricsBar";
import ProjectCard from "./ProjectCard";
import TaskRow from "./TaskRow";
import { getProjectsByOrgId, getTasksByProject, getMenteeList } from"@/lib/task-actions";
import { getUserProfile } from "@/lib/org-actions";
import type { Task, Project } from "@/types";

export default async function MentorDashboard({ org_id }: { org_id: string }) {
  const {user,profile}= await getUserProfile();

  if (!user || !org_id) {
    return <div className="text-white p-8">Unable to load dashboard — missing organization or user.</div>;
  }

  const projects: Project[] = (await getProjectsByOrgId(org_id)) || [];

  let allTasks: Task[] = [];
  const projectTasksMap: Record<string, Task[]> = {};

  for (const p of projects) {
    const tasks = (await getTasksByProject(p.id, user, true, org_id)) || [];
    projectTasksMap[p.id] = tasks;
    allTasks.push(...tasks);
  }

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.status === "completed").length;
  const activeTasks = allTasks.filter((t) => t.status !== "completed").length;
  const pendingReviews = allTasks.filter((t) => t.status === "verifying").length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let projectsDone = 0;
  for (const p of projects) {
    const tasks = projectTasksMap[p.id] || [];
    if (tasks.length > 0 && tasks.every((t) => t.status === "completed")) {
      projectsDone++;
    }
  }

  const recentActivities = allTasks
    .slice()
    .sort((a, b) => {
      const at = new Date(a["updated_at"] || a["created_at"] || 0).getTime();
      const bt = new Date(b["updated_at"] || b["created_at"] || 0).getTime();
      return bt - at;
    })
    .slice(0, 8);

  const metrics = [
    { label: "Active Tasks", value: activeTasks, sub: `Assigned` },
    { label: "Projects Done", value: projectsDone, sub: `${projects.length} total` },
    { label: "Tasks to Review", value: pendingReviews, sub: "Pending Tasks" },
    { label: "Completion Rate", value: `${completionRate}%`, sub: "This Month" },
  ];

  const projectCards = projects.map((p) => {
    const tasks = projectTasksMap[p.id] || [];
    const completed = tasks.filter((t) => t.status === "completed").length;
    return {
      id: p.id,
      name: p.name,
      completed,
      total: tasks.length,
      recent: tasks.slice().sort((a, b) => {
        const at = new Date(a.updated_at || a.created_at || 0).getTime();
        const bt = new Date(b.updated_at || b.created_at || 0).getTime();
        return bt - at;
      }),
    };
  });

  return (
    <main className="p-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back, {profile.full_name || "Mentor"}</h1>
        <p className="text-slate-400 mt-1">Overview of your organization’s projects and tasks</p>
      </div>

      <div>
        <MetricsBar metrics={metrics} />
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Project Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectCards.map((pc) => (
            <ProjectCard
              key={pc.id}
              projectName={pc.name}
              completedCount={pc.completed}
              totalCount={pc.total}
              recentTasks={pc.recent}
              statusLabel={pc.total === 0 ? "No tasks" : undefined}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
