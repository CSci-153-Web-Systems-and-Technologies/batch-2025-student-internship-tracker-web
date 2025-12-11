import { getTaskByID, getProjectsById } from "@/lib/task-actions";
import TaskDetailClient from "./TaskDetailLoader";
import { getUserProfile } from "@/lib/org-actions";


export default async function TaskDetailData({task_id,}: {task_id: string;}) {
  const task = await getTaskByID(task_id);
  const project = await getProjectsById(task?.project_id);
  const {isMentor} = await getUserProfile();

  return (
    <TaskDetailClient 
      task={task}
      project_name={project.name}
      isMentor = {isMentor}
    />
  );
}