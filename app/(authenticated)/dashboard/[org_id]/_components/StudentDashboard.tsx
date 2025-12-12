import MetricsBar from "./MetricsBar";
import ProjectCard from "./ProjectCard";
import TaskRow from "./TaskRow";
import { getStudentDashboardData } from "@/lib/dashboard-actions";

export default async function StudentDashboard({ orgId }: { orgId: string }) {
    
  if (!orgId || orgId.trim() === "") {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold text-red-400">Error</h1>
        <p className="text-slate-300 mt-2">Organization ID is required to load the dashboard.</p>
      </div>
    );
  }

  const res = await getStudentDashboardData(orgId);
  
  if (!res.ok || !res.data) {
    return <div className="p-8 text-white">Failed to load dashboard: {res.error}</div>;
  }
  
  const { org_id,profile, metrics, recentActivities, projectCards} = res.data;

  const metricsArr = [
    { label: "Active Tasks", value: metrics.activeTasks, sub: "Assigned" },
    { label: "Completed Tasks", value: metrics.completedTasks, sub: `${metrics.totalTasks} total` },
    { label: "Pending Reviews", value: metrics.pendingReviews, sub: "Awaiting Mentor" },
    { label: "Mentor's Review", value: metrics.mentorReviews, sub: "" },
  ];

  return (
    <main className="p-8 text-white space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back, {profile?.full_name ?? "Student"}</h1>
        <p className="text-slate-400 mt-1">Your assigned projects and tasks</p>
      </div>

      <div>
        <MetricsBar metrics={metricsArr} />
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectCards.map((pc: any) => (
            <ProjectCard
              key={pc.id}
              projectName={pc.name}
              completedCount={pc.completed}
              totalCount={pc.total}
              recentTasks={pc.recent}
            />
          ))}
          {projectCards.length === 0 && (
            <div className="col-span-full text-slate-400 text-center py-8">
              You have no assigned tasks yet.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activities (Your Tasks)</h2>
        <div className="space-y-3">
          {recentActivities.map((t: any) => (
            <TaskRow key={t.id} task={t}/>
          ))}
          {recentActivities.length === 0 && (
            <div className="text-slate-400 text-center py-4">
              No recent activities to show.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}