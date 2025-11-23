import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
    return(
        <nav className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">LaunchPad</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/10" >
                Log In 
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
}