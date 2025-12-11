"use client";
import { Task } from "@/types";

export default function ProjectCard({
  projectName,
  completedCount,
  totalCount,
  recentTasks,
  statusLabel,
}: {
  projectName: string;
  completedCount: number;
  totalCount: number;
  recentTasks: Task[];
  statusLabel?: string;
}) {
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-[#071326] p-5 rounded-lg border border-slate-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">{projectName}</h3>
          <div className="text-sm text-slate-300 mt-1">{`${completedCount}/${totalCount} Tasks Completed`}</div>
        </div>
        {statusLabel && (
          <div className="text-xs px-3 py-1 rounded-md bg-slate-900 text-slate-200">
            {statusLabel}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgba(36,199,163,1) 0%, rgba(6,182,212,1) 100%)",
            }}
          />
        </div>
        <div className="text-right text-xs text-slate-400 mt-2">Progress: {progress}% complete</div>
      </div>

      <div className="mt-4 space-y-2">
        {recentTasks.slice(0, 3).map((t) => (
          <div key={t.id} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white">
              {t.title?.[0]?.toUpperCase() ?? "T"}
            </div>
            <div className="flex-1">
              <div className="text-sm text-white">{t.title}</div>
              <div className="text-xs text-slate-400">{new Date(t.due_date).toLocaleDateString()}</div>
            </div>
            <div className="text-xs text-slate-300">
              {t.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
