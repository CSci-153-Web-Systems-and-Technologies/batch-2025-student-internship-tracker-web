"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, ChevronDown } from "lucide-react";

import {
  TaskType,
  TaskPriority,
  TaskStatus,
  CreateTaskDTO,
  CreateTaskFormProps,
  OrganizationMember
} from "@/types";

import { createTask } from "@/lib/task-actions";

export function CreateTaskForm({org_id,user_id,projects,students,onClose,}: CreateTaskFormProps) {

  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<TaskType>(TaskType.FEATURE);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState("");

  // Store user IDs, not objects
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [assignSearch, setAssignSearch] = useState("");
  const [assignDropdown, setAssignDropdown] = useState(false);

  // Dropdown states
  const [dropdown, setDropdown] = useState({
    project: false,
    type: false,
    priority: false,
  });

  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!projectId) newErrors.projectId = "Project is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (assignedTo.length === 0) newErrors.assignedTo = "Assign to at least 1 user";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Get the actual OrganizationMember objects for the selected IDs
    const assignedMembers = students.filter(student => 
      assignedTo.includes(student.id)
    );

    const payload: CreateTaskDTO = {
      org_id,
      project_id: projectId,
      title: title.trim(),
      description: description.trim(),
      type,
      priority,
      status: TaskStatus.TODO,
      assigned_to: assignedTo,
      created_by: user_id,
      due_date: dueDate,
    };

    await createTask(payload);
    onClose();
  };

  const selectedProject = projects.find((p) => p.id === projectId);
  
  // Filter mentees that aren't already selected
  const filteredMentees = students.filter((m) => {
  const name = m?.name || "";
    return name.toLowerCase().includes(assignSearch.toLowerCase()) &&
    !assignedTo.includes(m.id);
});

  const getSelectedUser = (userId: string) => {
    return students.find(m => m.id === userId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">Create New Task</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label className="text-slate-300">Project *</Label>

            <button
              type="button"
              onClick={() =>
                setDropdown((d) => ({ ...d, project: !d.project }))
              }
              className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg flex justify-between text-white w-full"
            >
              {selectedProject?.name || "Select project"}
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdown.project && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg mt-2">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setProjectId(p.id);
                      setDropdown((d) => ({ ...d, project: false }));
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-700"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}

            {errors.projectId && (
              <p className="text-red-400 text-sm">{errors.projectId}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-slate-300">Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-slate-300">Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-slate-800 border-slate-700 text-white resize-none"
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Type + Priority */}
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <Label className="text-slate-300">Type</Label>
              <button
                type="button"
                onClick={() =>
                  setDropdown((d) => ({ ...d, type: !d.type }))
                }
                className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg flex justify-between text-white w-full"
              >
                {type}
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdown.type && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg mt-2">
                  {Object.values(TaskType).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setType(t);
                        setDropdown((d) => ({ ...d, type: false }));
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-700"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Priority */}
            <div>
              <Label className="text-slate-300">Priority</Label>
              <button
                type="button"
                onClick={() =>
                  setDropdown((d) => ({ ...d, priority: !d.priority }))
                }
                className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg flex justify-between text-white w-full"
              >
                {priority}
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdown.priority && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg mt-2">
                  {Object.values(TaskPriority).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPriority(p);
                        setDropdown((d) => ({ ...d, priority: false }));
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-700"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assigned To + Due Date */}
          <div className="grid grid-cols-2 gap-4">

            {/* Assigned To */}
            <div>
              <Label className="text-slate-300">Assigned To *</Label>

              {/* Selected chips */}
              <div className="flex flex-wrap gap-2 mb-2">
                {assignedTo.map((userId) => {
                  const user = getSelectedUser(userId);
                  return (
                    <span
                      key={userId}
                      className="bg-blue-600 text-white px-2 py-1 rounded-lg flex items-center gap-2"
                    >
                      {user?.name}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setAssignedTo((prev) => prev.filter((id) => id !== userId))
                        }
                      />
                    </span>
                  );
                })}
              </div>

              {/* Search bar */}
              <Input
                value={assignSearch}
                onChange={(e) => {
                  setAssignSearch(e.target.value);
                  setAssignDropdown(true);
                }}
                onFocus={() => setAssignDropdown(true)}
                placeholder="Search mentee..."
                className="bg-slate-800 border-slate-700 text-white"
              />

              {/* Dropdown */}
              {assignDropdown && assignSearch && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {filteredMentees.length === 0 && (
                    <p className="px-4 py-2 text-slate-400">No match found</p>
                  )}

                  {filteredMentees.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setAssignedTo((prev) => [...prev, m.id]);
                        setAssignSearch("");
                        setAssignDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-700"
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}

              {errors.assignedTo && (
                <p className="text-red-400 text-sm">{errors.assignedTo}</p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <Label className="text-slate-300">Due Date *</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
              {errors.dueDate && (
                <p className="text-red-400 text-sm">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-500 text-white">
              Create Task
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}