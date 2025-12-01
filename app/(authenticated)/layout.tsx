import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/navbar-user";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
        <AppSidebar/>
        <SidebarInset className="flex flex-col min-h-screen bg-slate-950 text-white">
          <NavBar />
          <div className="pl-40">
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
