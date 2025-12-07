"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { createProject } from "@/lib/task-actions";
import { CreateProjectDTO, CreateProjectFormProps } from "@/types";
import { useRouter } from "next/navigation";

export function CreateProjectForm({ org_id, user_id, onClose }: CreateProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; submit?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    if (!name.trim()) {
      setErrors({ name: "Project name is required" });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const payload: CreateProjectDTO = {
        org_id: org_id,
        name: name.trim(),
        description: description.trim(),
        user_id: user_id,
      };
      const result = await createProject(payload);
      onClose();

      setTimeout(() => {
        router.refresh();
      }, 0)
      
    } catch (error) {
      console.error("Failed to create project:", error);
      setErrors({ 
        submit: error instanceof Error ? error.message : "Failed to create project" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">Create New Project</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">
              Project Name <span className="text-red-400">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({});
              }}
              className={`bg-slate-800 border-slate-700 text-white ${
                errors.name ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white resize-none"
              disabled={isSubmitting}
            />
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded-md">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onClose} 
              type="button" 
              variant="outline" 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}