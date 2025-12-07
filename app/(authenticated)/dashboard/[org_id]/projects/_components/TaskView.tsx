"use client"
import { Button } from "@/components/ui/button";
import { Suspense, useState, useEffect } from "react";
import ProjectSelect from "./ProjectSelect";
import TaskLoader from "./TaskLoader";
import { Project, OrganizationMember} from "@/types";
import { CreateProjectForm } from "./CreateProjectForm";
import { CreateTaskForm } from "./CreateTaskForm";

export default function TasksView({ projects, org_id,user_id, mentees}: { projects: Project[],org_id: string,user_id: string, mentees: OrganizationMember[]}) {
  const [selectedProject, setSelectedProject] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  
  const noProjects = projects.length === 0;

  useEffect(() => {
    if (projects.length > 0 && selectedProject === "") {
      setSelectedProject(projects[0].id);
    }
  }, [projects, selectedProject]);

  const handleCloseCreateProject = () => setShowCreateProject(false);
  const handleCloseCreateTask = () => setShowCreateTask(false);

  return (
    <div className="pr-20 pt-20 space-y-6 justify">
      <h1 className="text-3xl font-extrabold text-blue-400">
        Projects
      </h1>
      <div className="flex items-center gap-2">
        <ProjectSelect 
          projects={projects}
          selected={selectedProject}
          onChange={setSelectedProject}
        />
        <div className="flex gap-2">
          <Button 
            className="px-4 py-2 bg-slate-800 text-white rounded-md" 
            onClick={() => setShowCreateProject(true)}
            disabled={!user_id}
          >
            Create Project  
          </Button>

          <Button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md" 
            onClick={() => setShowCreateTask(true)}
            disabled={noProjects || !user_id}
          >
            Create Task
          </Button> 
        </div>
      </div>

      <div className="mt-4">
        {noProjects ? (
          <div className="border rounded-lg p-10 text-center text-slate-400">
            No projects. Create a project to begin managing tasks.
          </div>
        ) : selectedProject ? (
          <Suspense
            key={selectedProject}
            fallback={<p className="text-slate-400">Loading tasks…</p>}
          >
            <TaskLoader projectId={selectedProject} />
          </Suspense>
        ) : (
          <div className="border rounded-lg p-10 text-center text-slate-400">
            Select a project to view tasks
          </div>
        )}
      </div>

      {showCreateProject && user_id && (
        <CreateProjectForm 
          org_id={org_id}
          user_id={user_id}
          onClose={handleCloseCreateProject}
        />
      )}

      {showCreateTask && user_id && (
        <CreateTaskForm
          org_id={org_id}
          user_id={user_id}
          projects={projects}
          students={mentees}
          onClose={handleCloseCreateTask}
        />
      )}
    </div>
  );
}