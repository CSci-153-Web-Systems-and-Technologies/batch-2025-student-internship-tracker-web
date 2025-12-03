"use client"
import { Button } from "@/components/ui/button";
import { Suspense,useState } from "react";
import ProjectSelect from "./ProjectSelect";
import TaskLoader from "./TaskLoader";
import { Project } from "@/types";

export default function TasksView({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState(
    projects[0]?.id ?? ""
  );

  const noProjects = projects.length === 0;

  return (
     <div className="pr-20 pt-20 space-y-6 justify">
        <h1 className="text-3xl font-extrabold text-blue-400">
          Projects
        </h1>
        {/*Task Headers*/}
        <div className="flex items-center gap-2">
          <ProjectSelect 
            projects={projects}
            selected={selectedProject}
            onChange={setSelectedProject}
          />

          <div className="flex gap-2">
            <Button className="px-4 py-2 bg-slate-800 text-white rounded-md">
              Create Project  
            </Button>

            <Button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Create Task
            </Button> 
          </div>
        </div>

        <div className="mt-4">
          {noProjects ? (
            <div className="border rounded-lg p-10 text-center text-slate-400">
              No projects. Create a project to begin managing tasks.
            </div>
        ) : (
          <Suspense
            key={selectedProject}
            fallback={<p className="text-slate-400">Loading tasks…</p>}>
              <TaskLoader projectId={selectedProject} />
          </Suspense>
        )}
      </div>     
    </div>
  );
}