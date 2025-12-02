import { DataTable } from "./_components/DataTable";
import {columns} from "./_components/column"
import { Task } from "@/types";

export default function TasksPage(){
    const tasks: Task[] = [
    {
      id: "1",
      type: "feature",
      project_id: "abc123",
      description: "Add authentication system",
      due_date: new Date("2025-01-10"),
      status: "todo",
      priority: "high",
    },
    {
      id: "2",
      type: "bug",
      project_id: "abc123",
      description: "Fix broken navbar on mobile",
      due_date: new Date("2025-01-15"),
      status: "in_progress",
      priority: "medium",
    },
    {
      id: "3",
      type: "documentation",
      project_id: "abc123",
      description: "Write API usage guide",
      due_date: new Date("2025-01-20"),
      status: "verifying",
      priority: "low",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}