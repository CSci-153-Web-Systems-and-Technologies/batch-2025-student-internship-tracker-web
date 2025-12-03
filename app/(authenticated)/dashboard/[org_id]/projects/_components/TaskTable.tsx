"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/column";
import { Task } from "@/types";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
  return <DataTable columns={columns} data={tasks} />;
}