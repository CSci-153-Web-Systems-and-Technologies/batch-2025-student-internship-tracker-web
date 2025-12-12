"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
 Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { LayoutDashboard, Bell, ListTodo } from "lucide-react";
 
export function AppSidebar() {
  const { org_id } = useParams() as { org_id: string };
  return(
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 w-16 hover:w-40 bg-slate-900 text-white border-r border-white/10"
    >
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pt-20 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 align-center">
            Main
          </SidebarGroupLabel>

          <SidebarMenu className="pt-6">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href = {`/dashboard/${org_id}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="
                      ml-2 
                      hidden group-hover:inline
                      transition-all duration-300
                    ">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href = {`/dashboard/${org_id}/projects`}>
                  <ListTodo className="h-4 w-4" />
                  <span className="
                      ml-2 
                      hidden group-hover:inline
                      transition-all duration-300
                    ">Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href = {`/dashboard/${org_id}/notifications`}>
                  <Bell className="h-4 w-4" />
                  <span className="
                      ml-2 
                      hidden group-hover:inline
                      transition-all duration-300
                    ">Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
