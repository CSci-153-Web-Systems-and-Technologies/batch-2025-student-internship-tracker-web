import { getTaskByID } from "@/lib/task-actions";
import { getProjectsById } from "@/lib/task-actions";
import TaskDetailClient from "./_components/TaskDetailLoader";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Suspense } from "react";

export default async function TaskDetailPage(props: {params: Promise<{ task_id: string; org_id: string }>}) {
  const { task_id, org_id } = await props.params;

  const task = await getTaskByID(task_id);
  const project = await getProjectsById(task?.project_id);

  return (
    <Suspense fallback={<div><Spinner /></div>}>
      <TaskDetailClient
        task={task}
        project_name={project.name}
      />
    </Suspense>
  );
}
