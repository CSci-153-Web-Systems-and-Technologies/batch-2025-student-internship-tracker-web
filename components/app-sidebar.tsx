"use client";

import { useState, Suspense } from "react";
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
import { Spinner } from "@/components/ui/shadcn-io/spinner";

function SidebarLoading() {
  return (
    <Sidebar className="w-16 bg-slate-900 border-r border-white/10">
      <div className="flex items-center justify-center h-full">
        <Spinner className="h-6 w-6" />
      </div>
    </Sidebar>
  );
}

function AppSidebarContent() {
  const { org_id, inviteCode, isMentor } = useSidebarData();

  const copyToClipboard = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
    }
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${org_id}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="ml-2 hidden group-hover:inline">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${org_id}/projects`}>
                  <ListTodo className="h-4 w-4" />
                  <span className="ml-2 hidden group-hover:inline">Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${org_id}/notifications`}>
                  <Bell className="h-4 w-4" />
                  <span className="ml-2 hidden group-hover:inline">Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {isMentor && (
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
  return (
    <Suspense fallback={<SidebarLoading />}>
      <AppSidebarContent />
    </Suspense>
  );
}