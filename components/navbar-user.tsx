import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 backdrop-blur-sm bg-slate-900">
      <div className="px-8 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-white text-xl font-semibold">Organization</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            Feedback
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <LogoutButton />
        </div>

      </div>
    </header>
  );
}
