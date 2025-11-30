import { Button } from "@/components/ui/button";
import { Search, Filter, LayoutGrid, List, Plus, ChevronRight, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function OrganizationView({ projects, isMentor }: { projects: any[]; isMentor: boolean }) {
    return(
     <main>
         <div className="relative w-full h-full p-8 overflow-auto">

          {/* Search and Controls */}
          <div className="flex items-center gap-4 mb-8 w-full h-full p-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for an organization"
                className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
            </div>

            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <Button asChild>
                <Link href="/organization/join">
                <Plus className="w-4 h-4 mr-2" />
                Join Org
                </Link>
                </Button>

            {/* Only mentors can create organizations */}
            {isMentor && (
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/organization/create">
                  <Plus className="w-4 h-4 mr-2" />
                    Create Org
                </Link>
                </Button>
                )}
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
                            <h3 className="text-white mb-1">{project}</h3>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-slate-400">Organization</p>
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