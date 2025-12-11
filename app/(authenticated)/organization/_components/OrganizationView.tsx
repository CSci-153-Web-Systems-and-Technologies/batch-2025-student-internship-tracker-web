"use client";

import { Button } from "@/components/ui/button";
import { Search, Filter, LayoutGrid, List, Plus, ChevronRight, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function OrganizationView({projects,isMentor}: { projects: any[];isMentor: boolean;}) {
  const router = useRouter();

  return (
    <main>
      <div className="relative w-full h-full p-8 overflow-auto">
        {/* Search and Controls */}
        <div className="flex items-center gap-4 mb-8 w-full h-full pt-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for an organization"
              className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild>
              <span 
                className="flex items-center"
                onClick={() => router.push("/organization/forms/join_organization")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Join Org
              </span>
            </Button>

            {/* Only mentors can create organizations */}
            {isMentor && (
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <span
                  className="flex items-center"
                  onClick={() => router.push("/organization/forms/create_organization")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Org
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all group cursor-pointer"
              onClick={()=>router.push(`/dashboard/${project.id}`)}
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
