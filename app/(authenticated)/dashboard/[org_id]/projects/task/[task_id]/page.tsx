import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Home,
  Users,
  Layers,
  BarChart3,
  Settings,
  FileText,
  ArrowLeft,
  Calendar,
  User,
  Flag,
  Tag,
  Upload,
  File,
  X,
  Download,
  CheckCircle2
} from "lucide-react";
import { Task, Project } from "@/types";

interface SubmittedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

interface TaskDetailPageProps {
  task: Task;
  project: Project;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  onLogout?: () => void;
}

export function TaskDetailPage({ task, project, onNavigate, onBack, onLogout }: TaskDetailPageProps) {
  const [submittedFiles, setSubmittedFiles] = useState<SubmittedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    // Simulate file upload
    setTimeout(() => {
      const newFiles: SubmittedFile[] = Array.from(files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }));

      setSubmittedFiles([...submittedFiles, ...newFiles]);
      setIsUploading(false);
      event.target.value = '';
    }, 1000);
  };

  const handleRemoveFile = (fileId: string) => {
    setSubmittedFiles(submittedFiles.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bug":
        return "bg-red-900/50 text-red-300 border border-red-700/50";
      case "Feature":
        return "bg-green-900/50 text-green-300 border border-green-700/50";
      case "Documentation":
        return "bg-blue-900/50 text-blue-300 border border-blue-700/50";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-900/50 text-green-300 border border-green-700/50";
      case "In Progress":
        return "bg-blue-900/50 text-blue-300 border border-blue-700/50";
      case "Todo":
        return "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50";
      case "Backlog":
        return "bg-slate-800 text-slate-400 border border-slate-700";
      case "Cancelled":
        return "bg-red-900/50 text-red-300 border border-red-700/50";
      default:
        return "bg-slate-800 text-slate-300 border border-slate-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* Sidebar */}
      <aside className="relative w-16 border-r border-white/10 backdrop-blur-sm flex flex-col items-center py-6 gap-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        
        <nav className="flex flex-col gap-4">
          <button 
            onClick={() => onNavigate?.('dashboard')}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onNavigate?.('projects')}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-white/10 transition-colors"
          >
            <Layers className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <FileText className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </nav>

        <div className="mt-auto space-y-4">
          {onLogout && (
            <button 
              onClick={onLogout}
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
              title="Logout"
            >
              <span className="text-xs">←</span>
            </button>
          )}
          <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
            <span>J</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-slate-400 hover:text-white mb-4 -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-white">{task.title || task.description}</h1>
                  <span className={`px-3 py-1 rounded text-sm ${getTypeColor(task.type)}`}>
                    {task.type}
                  </span>
                </div>
                <p className="text-slate-400">
                  {project.name} • {task.id}
                </p>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>

          {/* Task Details Card */}
          <div className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h2 className="text-white mb-4">Task Details</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Priority */}
              <div className="flex items-start gap-3">
                <Flag className={`w-5 h-5 mt-1 ${getPriorityColor(task.priority)}`} />
                <div>
                  <p className="text-slate-400 text-sm mb-1">Priority</p>
                  <p className={`${getPriorityColor(task.priority)}`}>{task.priority}</p>
                </div>
              </div>

              {/* Assigned To */}
              {task.assigned_to && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Assigned To</p>
                    <p className="text-white">{task.assigned_to}</p>
                  </div>
                </div>
              )}

              {/* Due Date */}
              {task.due_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Due Date</p>
                    <p className="text-white">
                      {new Date(task.due_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Task Type */}
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-sm mb-1">Type</p>
                  <p className="text-white">{task.type}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {task.title && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-slate-400 text-sm mb-2">Description</p>
                <p className="text-slate-300">{task.description}</p>
              </div>
            )}
          </div>

          {/* File Submission Section */}
          <div className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white mb-1">Submissions</h2>
                <p className="text-slate-400 text-sm">
                  Upload files related to this task
                </p>
              </div>
              <label htmlFor="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Files'}
                </Button>
              </label>
            </div>

            {/* Submitted Files List */}
            {submittedFiles.length > 0 ? (
              <div className="space-y-3">
                {submittedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4 group hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <File className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{file.name}</p>
                      <p className="text-slate-400 text-sm">
                        {formatFileSize(file.size)} • Uploaded {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center">
                <Upload className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">No files submitted yet</p>
                <p className="text-slate-500 text-sm">
                  Click the upload button above to submit your work
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}