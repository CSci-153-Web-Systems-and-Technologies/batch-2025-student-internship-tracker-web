import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, ChevronDown } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface CreateTaskFormProps {
  onClose: () => void;
  onSubmit: (data: {
    projectId: string;
    title: string;
    description: string;
    type: string;
    priority: string;
    assignedTo: string;
    dueDate: string;
  }) => void;
  projects: Project[];
  defaultProjectId?: string;
}

export function CreateTaskForm({ onClose, onSubmit, projects, defaultProjectId }: CreateTaskFormProps) {
  const [projectId, setProjectId] = useState(defaultProjectId || projects[0]?.id || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Feature");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  
  const [errors, setErrors] = useState<{ 
    projectId?: string;
    title?: string;
    description?: string;
    assignedTo?: string;
    dueDate?: string;
  }>({});

  const taskTypes = ["Feature", "Bug", "Documentation"];
  const priorities = ["Low", "Medium", "High"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    // Validate
    if (!projectId) newErrors.projectId = "Project is required";
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!assignedTo.trim()) newErrors.assignedTo = "Assigned to is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    onSubmit({
      projectId,
      title: title.trim(),
      description: description.trim(),
      type,
      priority,
      assignedTo: assignedTo.trim(),
      dueDate
    });

    // Reset and close
    setProjectId(defaultProjectId || projects[0]?.id || "");
    setTitle("");
    setDescription("");
    setType("Feature");
    setPriority("Medium");
    setAssignedTo("");
    setDueDate("");
    setErrors({});
    onClose();
  };

  const selectedProject = projects.find(p => p.id === projectId);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="task-project" className="text-slate-300">
              Project <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-white hover:bg-slate-700 transition-colors flex items-center justify-between ${
                  errors.projectId ? 'border-red-500' : 'border-slate-700'
                }`}
              >
                <span className="text-left">{selectedProject?.name || "Select a project"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProjectDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden z-10 shadow-xl">
                  {projects.map((project) => (
                    <button
                      type="button"
                      key={project.id}
                      onClick={() => {
                        setProjectId(project.id);
                        setIsProjectDropdownOpen(false);
                        if (errors.projectId) setErrors({ ...errors, projectId: undefined });
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                        projectId === project.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.projectId && (
              <p className="text-red-400 text-sm">{errors.projectId}</p>
            )}
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="task-title" className="text-slate-300">
              Title <span className="text-red-400">*</span>
            </Label>
            <Input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder="Enter task title"
              className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="task-description" className="text-slate-300">
              Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              placeholder="Enter task description"
              rows={3}
              className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Type and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="task-type" className="text-slate-300">
                Type <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors flex items-center justify-between"
                >
                  <span>{type}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isTypeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden z-10 shadow-xl">
                    {taskTypes.map((taskType) => (
                      <button
                        type="button"
                        key={taskType}
                        onClick={() => {
                          setType(taskType);
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                          type === taskType ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        {taskType}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Priority Selection */}
            <div className="space-y-2">
              <Label htmlFor="task-priority" className="text-slate-300">
                Priority <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors flex items-center justify-between"
                >
                  <span>{priority}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isPriorityDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden z-10 shadow-xl">
                    {priorities.map((priorityOption) => (
                      <button
                        type="button"
                        key={priorityOption}
                        onClick={() => {
                          setPriority(priorityOption);
                          setIsPriorityDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                          priority === priorityOption ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        {priorityOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assigned To and Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assigned To Field */}
            <div className="space-y-2">
              <Label htmlFor="task-assigned-to" className="text-slate-300">
                Assigned To <span className="text-red-400">*</span>
              </Label>
              <Input
                id="task-assigned-to"
                type="text"
                value={assignedTo}
                onChange={(e) => {
                  setAssignedTo(e.target.value);
                  if (errors.assignedTo) setErrors({ ...errors, assignedTo: undefined });
                }}
                placeholder="Enter assignee name"
                className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                  errors.assignedTo ? 'border-red-500' : ''
                }`}
              />
              {errors.assignedTo && (
                <p className="text-red-400 text-sm">{errors.assignedTo}</p>
              )}
            </div>

            {/* Due Date Field */}
            <div className="space-y-2">
              <Label htmlFor="task-due-date" className="text-slate-300">
                Due Date <span className="text-red-400">*</span>
              </Label>
              <Input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors({ ...errors, dueDate: undefined });
                }}
                className={`bg-slate-800 border-slate-700 text-white ${
                  errors.dueDate ? 'border-red-500' : ''
                }`}
              />
              {errors.dueDate && (
                <p className="text-red-400 text-sm">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
