"use client";
import { Task } from "@/types";

export default function TaskRow({ task }: { task: Task }) {
  const progressFromStatus = (status: string) => {
    switch (status) {
      case "done":
        return 100;
      case "verifying":
        return 75;
      case "in_progress":
        return 50;
      default:
        return 0;
    }
  };

  const progress = progressFromStatus(task.status);

  return (
    <div className="flex items-center gap-4 p-3 bg-[#06121a] rounded-md border border-slate-800">
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium text-white">{task.title}</div>
            <div className="text-xs text-slate-400">{task.description}</div>
          </div>
          <div className="text-xs text-slate-300">{new Date(task.due_date).toLocaleDateString()}</div>
        </div>

        <div className="mt-3">
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#06b6d4,#24c7a3)"}}/>
          </div>
          <div className="text-right text-xs text-slate-400 mt-1">{`Progress: ${progress}%`}</div>
        </div>
      </div>
    </div>
  );
}
