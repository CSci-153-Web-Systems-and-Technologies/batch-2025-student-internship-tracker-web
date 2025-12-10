import { getTaskByID, getProjectsById } from "@/lib/task-actions";
import TaskDetailClient from "./TaskDetailLoader";


export default async function TaskDetailData({task_id,}: {task_id: string;}) {
  const task = await getTaskByID(task_id);
  const project = await getProjectsById(task?.project_id);

  return (
    <TaskDetailClient 
      task={task}
      project_name={project.name}
    />
  );
}