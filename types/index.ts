import { ColumnDef } from '@tanstack/react-table';  


//Enums//
export enum TaskType {
  BUG = "bug",
  DOCUMENTATION = "documentation",
  FEATURE = "feature",
  REFACTOR = "refactor",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  VERIFYING = "verifying",
  CANCELLED = "cancelled",
}


//Types//
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



export type Project = {
  id: string;
  org_id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

export type Task = {
  id : string;
  org_id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assigned_to: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  due_date: string;
  project_id: string;
  file_submission: string;
};

 export interface DataTableProps<TData, TValue>{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

//Interface Prop
export interface ProjectSelectorProps{
  projects: Project[];
  selected: string | "";
  onChange: (value:string) => void;
}