"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/navbar-user";
import { usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Suspense } from "react";
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
        <SidebarInset className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white text-white">
          {showNavbar && <NavBar />}
           <div className="pl-40 ">
              <Suspense fallback={
                <div className="flex items-center justify-center w-full py-20">
                  <Spinner variant="circle-filled" size={32} />
                </div>
              }>
                {children}
              </Suspense>
        </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
