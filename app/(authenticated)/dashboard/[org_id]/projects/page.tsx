import { createClient } from "@/lib/supabase/server";
import TasksView from "./_components/TaskView";
import { getUserProfile } from "@/lib/org-actions";
export default async function TasksPage({ params }: { params: Promise<{ org_id: string }>}) {

  const resolvedParams = await params;
  const org_id = resolvedParams.org_id;
  
  console.log("TasksPage org_id:", org_id);
  
  const supabase = await createClient();
  const { user } = await getUserProfile();

  // If no user is found
  if (!user) {
    return (
      <div className="p-20">
        <h1 className="text-2xl text-red-500">Authentication required</h1>
        <p className="text-slate-400">Please log in to view projects.</p>
      </div>
    );
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", org_id);

  return (
    <TasksView 
      projects={projects ?? []} 
      org_id={org_id}
      user_id={user.id}
    />
  );
}