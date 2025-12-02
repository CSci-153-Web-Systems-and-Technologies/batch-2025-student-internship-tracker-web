"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Task } from "@/types"

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: "Task_ID",
    },
    {
        accessorKey: "type",
        header: "Task Type",
    },
    {
        accessorKey:"project_id",
        header: "Project"
    },
    {
        accessorKey: "description",
        header: "Task Description",
    },
    {
        accessorKey: "due_date",
        header: "Deadline",
    },

    {
        accessorKey: "status",
        header: "Status",
    },

    {
        accessorKey: "priority",
        header: "Priority",
    },
]