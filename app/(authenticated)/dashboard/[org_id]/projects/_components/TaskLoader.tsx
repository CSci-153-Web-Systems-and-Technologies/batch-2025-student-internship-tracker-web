"use server"

import TasksTable from "./TaskTable";
import { createClient } from "@/lib/supabase/server";

export default async function TaskLoader({projectId}: {projectId: string}) {
    const supabase = await createClient();

    const {data:tasks} = await supabase
    .from("task")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {ascending:false});

    if(!tasks|| tasks.length == 0){
         return (
            <div className="border rounded-lg p-10 text-center text-slate-400">
                 No tasks found for this project.
            </div>
    );
    }

    return <TasksTable tasks={tasks} />;
}