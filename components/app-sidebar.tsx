"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSidebarData } from "@/components/sidebar-data";
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
} from "@/components/ui/sidebar";
import { LayoutDashboard, Bell, ListTodo, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SidebarLoading() {
  return (
    <Sidebar className="w-16 bg-slate-900 border-r border-white/10">
      <div className="flex items-center justify-center h-full text-center px-2">
        <p className="text-white text-sm">
          Go to an organization to load the sidebar
        </p>
      </div>
    </Sidebar>
  );
}

function AppSidebarContent() {
  const { org_id, inviteCode, isMentor } = useSidebarData();

  const copyToClipboard = () => {
    if (inviteCode) navigator.clipboard.writeText(inviteCode);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 w-16 hover:w-40 bg-slate-900 text-white border-r border-white/10"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Main
          </SidebarGroupLabel>

          <SidebarMenu className="pt-6">

            {org_id && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/dashboard/${org_id}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="ml-2 hidden group-hover:inline">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {org_id && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/dashboard/${org_id}/projects`}>
                    <ListTodo className="h-4 w-4" />
                    <span className="ml-2 hidden group-hover:inline">Tasks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {org_id && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/dashboard/${org_id}/notifications`}>
                    <Bell className="h-4 w-4" />
                    <span className="ml-2 hidden group-hover:inline">Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {org_id && isMentor && (
              <SidebarMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <SidebarMenuButton>
                      <UserPlus className="h-4 w-4" />
                      <span className="ml-2 hidden group-hover:inline">Invite</span>
                    </SidebarMenuButton>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-300 text-black">
                    <DialogHeader>
                      <DialogTitle>Organization Invite Code</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Share this code so new members can join your organization.
                      </p>

                      <div className="flex items-center space-x-2">
                        <Input value={inviteCode || "No invite code"} readOnly className="font-mono" />
                        <Button onClick={copyToClipboard} disabled={!inviteCode}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export function AppSidebar() {
  const { org_id } = useSidebarData();

  if (!org_id) return <SidebarLoading />;

  return <AppSidebarContent />;
}
