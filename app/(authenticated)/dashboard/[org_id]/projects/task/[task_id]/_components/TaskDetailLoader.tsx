"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadStudentSubmission, removeStudentSubmission,reviewSubmission } from "@/lib/task-actions";
import { Task} from "@/types";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  File as FileIcon,
  X,
  Download,
  CheckCircle2,
  User,
  Tag,
  Calendar,
  Flag,
} from "lucide-react";

interface TaskDetailClientProps {
  task: Task;
  project_name: string;
  isMentor: boolean;
}

export default function TaskDetailClient({ task, project_name, isMentor}: TaskDetailClientProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [submissions, setSubmissions] = useState<string[]>(task.file_submissions || []);
  const [mentorComment, setMentorComment] = useState("");
  const router = useRouter();
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files?.length) return;

  setIsUploading(true);
  const file = files[0];

  console.log("[Upload] Selected file:", file.name, file.size, file.type);

  try {
    const res = await uploadStudentSubmission({
      file,
      task_id: task.id,
      folderPath: `${task.id}`,
    });

    console.log("[Upload] Response from uploadStudentSubmission:", res);

    if (res.success && res.data) {
      console.log("[Upload] File uploaded successfully, path:", res.data.path);
      setSubmissions((prev) => [...prev, res.data?.path || ""]);
      router.refresh?.();
    } else {
      console.warn("[Upload] Upload failed:", res.error);
      alert(res.error || "Upload failed");
    }
  } catch (error) {
    console.error("[Upload] Unexpected error:", error);
    alert("Failed to upload file");
  } finally {
    setIsUploading(false);
    e.target.value = '';
  }
  };
  const handleReview = async (IsApproved: boolean, comment: string) =>{
     try{
        const res = await reviewSubmission(task.id,IsApproved,comment);

        if(res.success){
          alert('Submission Approved successfully!');
          setMentorComment("")
          router.refresh?.();
        }else{
          alert(res.error || "Failed to review submission");
        }
     }
     catch(error){
        console.error(error);
        alert("An unexpected error occurred.");
     } 
  };
  const handleRemoveSubmission = async (path: string) => {
    if (!confirm("Are you sure you want to remove this submission?")) return;

    try {
      const res = await removeStudentSubmission(task.id, path);

      if (res.success) {
        setSubmissions((prev) => prev.filter((sub) => sub !== path));
        alert("Submission removed successfully!");
        router.refresh?.();
      } else {
        alert(res.message || "No submission found.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to remove submission.");
    }
  };


  const handleDownload = (path: string) => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/student_submissions/${path}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex">
      <main className="flex-1 p-10 max-w-5xl mx-auto">
        
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h1 className="text-white text-3xl font-semibold flex items-center gap-3">
          {task.title}
          <span className="bg-blue-500/20 px-3 py-1 rounded text-blue-300">
            {task.type}
          </span>
        </h1>

        <p className="text-slate-400 mt-1">
          {project_name} • Task ID: {task.id}
        </p>


        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 mt-6">
          <h2 className="text-white text-lg mb-4">Task Details</h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="flex gap-3">
              <Flag className="text-yellow-300" />
              <div>
                <p className="text-slate-400 text-sm">Priority</p>
                <p className="text-white">{task.priority}</p>
              </div>
            </div>


            {task.assigned_to && (
              <div className="flex gap-3">
                <User className="text-slate-300" />
                <div>
                  <p className="text-slate-400 text-sm">Assigned To</p>
                  <p className="text-white">{task.assigned_to}</p>
                </div>
              </div>
            )}


            {task.due_date && (
              <div className="flex gap-3">
                <Calendar className="text-slate-300" />
                <div>
                  <p className="text-slate-400 text-sm">Due Date</p>
                  <p className="text-white">
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}


            <div className="flex gap-3">
              <Tag className="text-slate-300" />
              <div>
                <p className="text-slate-400 text-sm">Type</p>
                <p className="text-white">{task.type}</p>
              </div>
            </div>
          </div>


          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 text-sm">Description</p>
            <p className="text-slate-300 mt-1">{task.description}</p>
          </div>
        </div>


        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-white text-lg">
                {isMentor ? "Student Submissions" : "Your Submission"}
              </h2>
              <p className="text-slate-400 text-sm">
                {isMentor
                  ? "Review submitted files from the assigned student"
                  : "Upload your task output or materials"}
              </p>
            </div>

            {!isMentor && task.status !== "completed" && (
              <label>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  disabled={isUploading}
                />
                <Button 
                  asChild
                  disabled={isUploading} 
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <div className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload File"}
                  </div>
                </Button>
              </label>
            )}  
          </div>

          {submissions.length === 0 ? (
            <div className="border border-dashed border-slate-700 rounded-lg p-10 text-center text-slate-500">
              {isMentor ? "No submissions yet" : "You have not submitted any files"}
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((path) => (
                <div
                  key={path}
                  className="flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-lg"
                >
                  <FileIcon className="text-blue-400" />

                  <div className="flex-1 overflow-hidden">
                    <p className="text-white truncate">{path.split("/").pop()}</p>
                    <p className="text-slate-400 text-sm truncate">{path}</p>
                  </div>

                  <CheckCircle2 className="text-green-400" />

                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDownload(path)}
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  {!isMentor && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveSubmission(path)}
                      title="Remove"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isMentor && task.mentor_review && (
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 mt-6">
              <h2 className="text-white text-lg mb-2">Mentor Review</h2>

              <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700">
              <p className="text-slate-300 whitespace-pre-line">
                {task.mentor_review}
              </p>
            </div>
          </div>
        )}
        
        </div>
        {isMentor && task.status !== "completed" &&(
          <div className="pt-5 space-y-3">
            <div className="flex flex-col">
              <label className="text-slate-400 mb-1">Comment <span className="text-red-400">*</span></label>
              <textarea
                className="bg-slate-800 text-white p-2 rounded border border-slate-700 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                rows={3}
                placeholder="Enter your comment"
                value={mentorComment}
                onChange={(e) => setMentorComment(e.target.value)}
              />              
            </div>
              
            <div className="flex items-center gap-2 pt-5">
              <Button className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleReview(true, mentorComment)}>
                Approve
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleReview(true, mentorComment)}>
                Reject
              </Button>
            </div>            
          </div>
        )}
      </main>
    </div>
  );
}