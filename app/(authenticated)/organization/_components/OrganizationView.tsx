"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, LayoutGrid, List, Plus, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function OrganizationView({ projects, isMentor }: { projects: any[]; isMentor: boolean }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <div className="relative w-full h-full p-8 overflow-auto">

        <div className="flex items-center gap-4 mb-8 pt-8">

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <Input
              type="text"
              placeholder="Search for an organization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">

            <Button
              onClick={() => router.push("/organization/forms/join_organization")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Join Org
            </Button>

            {isMentor && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/organization/forms/create_organization")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Org
              </Button>
            )}

          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => router.push(`/dashboard/${project.id}`)}
              className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 backdrop-blur-sm transition-all group cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-white mb-1">{project.name}</h3>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-slate-400">{project.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </main>
  );
}
