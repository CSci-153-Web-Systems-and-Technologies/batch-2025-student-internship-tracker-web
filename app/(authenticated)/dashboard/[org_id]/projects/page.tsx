import { createClient } from "@/lib/supabase/server";
import TasksView from "./_components/TaskView";

export default async function TasksPage({ params }: { params: { orgId: string } }) {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", params.orgId);

  if (!projects || projects.length === 0) {
    return (
      <div className="p-10 text-center text-slate-400">
        <h2 className="text-xl font-semibold mb-2">No projects found</h2>
        <p>Create a project to begin managing tasks.</p>
      </div>
    );
  }

  return <TasksView projects={projects} />;
}