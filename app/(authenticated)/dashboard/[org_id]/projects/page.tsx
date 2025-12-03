import { createClient } from "@/lib/supabase/server";
import TasksView from "./_components/TaskView";

export default async function TasksPage({ params }: { params: { orgId: string } }) {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", params.orgId);

 return (
    <TasksView projects={projects ?? []} />
  );
}