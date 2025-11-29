import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";

export default function ProjectsHeaderPage() {
  return (
      <header className="sticky top-0 z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-xl font-semibold">Projects</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors">
              Feedback
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <LogoutButton/>
          </div>
        </div>
      </header>
  );
}
