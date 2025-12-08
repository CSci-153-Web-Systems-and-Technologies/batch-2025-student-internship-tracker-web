"use client"

import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/column";
import { Task } from "@/types";
import { getUserProfile } from "@/lib/org-actions";
import { getTasksByProject } from "@/lib/task-actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TaskLoaderProps {
    projectId: string;
    orgId:string
}

export default function TaskLoader({ projectId, orgId }: TaskLoaderProps) {
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMentor, setIsMentor] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        async function loadTasks() {
            try {
                setLoading(true);

                const {user,isMentor} = await getUserProfile();
                setIsMentor(isMentor);
                const data = await getTasksByProject(projectId,user,isMentor, orgId);
                console.log(data);
                setTasks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load tasks");
            } finally {
                setLoading(false);
            }
        }

        if (projectId) {
            loadTasks();
        }
    }, [projectId, router]);

    if (loading) {
        return <p className="text-slate-400">Loading tasks…</p>;
    }

    if (error) {
        console.log(error)
        return (
            <div className="border rounded-lg p-10 text-center text-red-400">
                {error}
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="border rounded-lg p-10 text-center text-slate-400">
                {isMentor 
                    ? "No tasks found for this project." 
                    : "No tasks assigned to you in this project."}
            </div>
        );
    }

    return <DataTable columns={columns} data={tasks} />;
}