"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/navbar-user";
import { usePathname } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showSidebar = pathname.startsWith("/dashboard");

  const showNavbar =
  pathname.startsWith("/organization") ||
  pathname.startsWith("/forms") ||
  pathname.startsWith("/dashboard");

  
  return (
    <SidebarProvider >
      {showSidebar && <AppSidebar/> }
        <SidebarInset className="flex flex-col min-h-screen bg-slate-950 text-white">
          {showNavbar && <NavBar />}
          <div className="pl-40">
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
