"use client";

import { DataTable } from "@/app/(authenticated)/dashboard/[org_id]/projects/_components/DataTable";
import { columns } from "@/app/(authenticated)/dashboard/[org_id]/projects/_components/column";
import { Task } from "@/types";

export default function TasksTable({ tasks }: { tasks: Task[] }) {
  return <DataTable columns={columns} data={tasks} />;
}