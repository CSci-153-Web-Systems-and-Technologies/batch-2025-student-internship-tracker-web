import { NavBar } from "@/components/navbar-landing-page";
import { Rocket, Calendar, ListTodo, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
       <NavBar />

       <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className = "grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block"> 

                  <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Rocket className="inline-block w-5 h-5 mr-2 mb-1" />
                    Welcome to the Future
                  </span>

                  <h1 className="text-white text-[40px] font-extrabold">
                    Launch your Internship Journey with LaunchPad
                  </h1>

                  <p className="text-slate-300 text-lg text-justify">
                    Streamline your internship tasks, track progress, and
                    manage offers all in one place with LaunchPad. Actually
                    designed to launch it straight down to the ground.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                      Get Started
                    </Button>
                    
                    <Button size="lg" variant="outline" className="border-slate-600 text-blue-500 hover:bg-white/10 bg-white">
                      Watch Demo
                    </Button>
                  </div>

                  <div className ="flex item-center gap-8 pt-4 ">
                    <div>
                      <div className="text-white">1+</div>
                      <div className="text-slate-400">Active User</div>
                    </div>
                    <div className="w-px h-12 bg-slate-700"></div>
                      <div>
                        <div className="text-white">0</div>
                        <div className="text-slate-400">Projects Launched</div>
                      </div>
                    <div className="w-px h-12 bg-slate-700"></div>
                      <div>
                        <div className="text-white">0%</div>
                        <div className="text-slate-400">Success Rate</div>
                      </div>
                    </div>
                </div>
              </div>
              <div className="relative">
                <Image 
                    src ="/lp-img.png" 
                    alt="LaunchPad Illustration" 
                    width={600} height={400}
                />
              </div>
            </div>
          </div>
       </section>

       <section id ="features" className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-1">
              <h2 className="text-slate-300">
                Everything You Need to Succeed
              </h2>
              <p className="text-white text-lg max-w-2xl mx-auto font-extrabold">
                Features to Supercharge Your Internship Experience
              </p>
            </div> 
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 ">
             <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm 
                              hover:bg-slate-900/70 transition-all">
                <CardContent className="p-6 space-y-4">
                   <div className= "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <ListTodo className="w-6 h-6 text-blue-300" />
                   </div>
                   <h3 className="text-white">Task Management System</h3>
                   <p className="text-slate-400">
                      Keep Track of Your Tasks assigned during your internship with our intuitive task management system.
                   </p>
                </CardContent>
             </Card>
             <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm 
                              hover:bg-slate-900/70 transition-all">
                <CardContent className="p-6 space-y-4">
                   <div className= "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-300" />
                   </div>
                   <h3 className="text-white">Calendar System</h3>
                   <p className="text-slate-400">
                      Stay organized and never miss a deadline with our integrated calendar system, designed to keep you on track throughout your internship.
                   </p>
                </CardContent>
             </Card>
             <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm 
                              hover:bg-slate-900/70 transition-all">
                <CardContent className="p-6 space-y-4">
                   <div className= "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6 text-blue-300" />
                   </div>
                   <h3 className="text-white">Dashboard Analytics</h3>
                   <p className="text-slate-400">
                      Gain insights into your internship performance with our comprehensive dashboard analytics, helping you track your progress and achievements.
                   </p>
                </CardContent>
             </Card>
          </div>
       </section>
       
       <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 lg:p-20">
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-white">
                Ready to Launch?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Join thousands of teams already building amazing products with LaunchPad. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          </div>
        </div>
      </section>

       <section id="contact" className="py-20 lg:py-32">
        <footer className="border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white ">LaunchPad</span>
                </div>
                <p className="text-slate-400">
                  Building the future, one launch at a time.
                </p>
              </div>
            <div>
              <h4 className="text-white mb-4">Contacts</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Email</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Number</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-slate-400">
            <p>© 2025 LaunchPad. All rights reserved.</p>
          </div>
          </div>
        </footer>
       </section>
    </main>
  );
}
