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

export type OrganizationMember = {
  id: string;
  name: string;
  org_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export type Metric = {
  label: string;
  value: number | string;
  sub?: string;
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
  project_id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  assigned_to: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  due_date: string;
  file_submissions: string[];
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

export interface CreateTaskFormProps {
  org_id: string;
  user_id: string;
  projects: Project[];
  students: OrganizationMember[];
  onClose: () => void;
}

export interface CreateProjectFormProps {
  org_id: string;
  user_id: string;
  onClose: () => void;
}


//Payload
export type CreateProjectDTO = {
  org_id: string;
  name: string;
  description: string;
  user_id: string;
};

  export type CreateTaskDTO = {
    org_id: string;
    project_id: string;
    title: string;
    description: string;
    type: TaskType;
    priority: TaskPriority;
    status: TaskStatus;
    assigned_to:string[];
    created_by: string;
    due_date: string;
  };

export interface UploadOptions {
  file: File;
  bucketId?: string;
  folderPath?: string;
  metadata?: Record<string, any>;
}

export interface UploadResponse {
  success: boolean;
  data?: any;
  error?: string;
}