import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { Search, Filter, LayoutGrid, List, Plus, ChevronRight, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function OrganizationPage() {
    const projects = [
        {
            name: "Accenture",
            region: "AWS | ap-southeast-1",
            status: "ongoing"
        },
              
    ];
    return (
        <main>
          <div className="relative w-full h-full p-8 overflow-auto">
          {/* Search and Controls */}
          <div className="flex items-center gap-4 mb-8 w-full h-full p-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for a project"
                className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-9 h-9 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <List className="w-4 h-4" />
              </button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white ml-2">
                <Plus className="w-4 h-4 mr-2" />
                Join Org
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-white mb-1">{project.name}</h3>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-slate-400">{project.region}</p>
                      {project.tags && (
                        <div className="flex gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {project.status && (
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                      <Pause className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">Project is {project.status}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </main>
    )
};
