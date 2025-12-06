import { useState } from "react";
import { Button } from "@/components//ui/button";
import { Input } from "@/components//ui/input";
import { Label } from "@/components//ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface CreateProjectFormProps {
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => void;
}

export function CreateProjectForm({ onClose, onSubmit }: CreateProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!name.trim()) {
      setErrors({ name: "Project name is required" });
      return;
    }

    // Submit
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined
    });

    // Reset and close
    setName("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-slate-300">
              Project Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({});
              }}
              placeholder="Enter project name"
              className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-slate-300">
              Description <span className="text-slate-500">(Optional)</span>
            </Label>
            <Textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={4}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none"
            />
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
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
