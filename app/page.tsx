"use client";

import { NavBar } from "@/components/navbar-main"; 
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Calendar, ListTodo, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <NavBar/>      
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
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={()=> router.push('/login')} >
                      Get Started
                    </Button>
                    
                    <Link href="https://www.youtube.com/shorts/ybgTBIzWEpM" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-600 text-blue-500 hover:bg-white/10 bg-white">
                      Watch Demo
                    </Link>
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
              <h2 className="text-slate-300">Everything You Need to Succeed</h2>
              <p className="text-white text-lg max-w-2xl mx-auto font-extrabold"> Features to Supercharge Your Internship Experience </p>
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
              <h2 className="text-white"> Ready to Launch? </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Join thousands of teams already building amazing products with LaunchPad. Start your free trial today.
                </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100" onClick={()=>router.push('/app/(auth)/login')}>
    Get Started
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-500 opacity-20"></div>
          </div>
        </div>
      </section>

       <section id="contact" className="py-20 lg:py-32">
        <footer className="border-t border-white/10 py-12">
            <div className="flex flex-wrap gap-24 justify-center ">
              <div className="text-center pr-20">
                <h4 className="text-white mb-4">Product</h4>
                <ul className="flex gap-6">
                  <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                </ul>
              </div>
              <div className="text-center pl-20">
                <h4 className="text-white mb-4">Contact</h4>
                <ul className="flex gap-6">
                  <li><Link href="mailto:Officialketchupped@gmail.com" className="text-slate-400 hover:text-white transition-colors">Gmail</Link></li>
                  <li><Link href="https://github.com/Officialketchupped-debug" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Github</Link></li>
                </ul>
              </div>
            </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-slate-400">
            <p>© 2025 LaunchPad. All rights reserved.</p>
          </div>
      </footer>
       </section>
    </main>
  );
}
