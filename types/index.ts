import { ColumnDef } from '@tanstack/react-table';  

export type MembershipWithOrg ={
    org_id : string;
    organizations: {
    id: string;
    name: string;
    invite_code: string;
    created_by: string;
    created_at: string;
    description: string;
  };
};

export type Task = {
  id: string;
  type: "bug" | "documentation" | "feature" | "refactor";
  project_id: string;
  description: string;
  due_date: Date;
  status: "todo" | "in_progress" | "verifying" | "cancelled" | "completed";
  priority: "low" | "medium" | "high";
};

 export interface DataTableProps<TData, TValue>{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}