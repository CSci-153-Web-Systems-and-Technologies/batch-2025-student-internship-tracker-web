"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ProjectSelect from "./ProjectSelect";
import TasksTable from "./TaskTable";
import { Task } from "@/types"; 
import { Project } from "@/types";

export default function TasksView({ projects }: { projects: Project[] }) {
  const supabase = createClient();

  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", selectedProject)
        .order("created_at", { ascending: false });

      setTasks(data || []);
      setLoading(false);
    }

    fetchTasks();
  }, [selectedProject]);

  return (
    <div className="p-8 space-y-6">
      <ProjectSelect
        projects={projects}
        selected={selectedProject}
        onChange={setSelectedProject}
      />

      {loading ? (
        <p className="text-slate-400">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <div className="border rounded-lg p-10 text-center text-slate-400">
          No tasks found for this project.
        </div>
      ) : (
        <TasksTable tasks={tasks} />
      )}
    </div>
  );
}