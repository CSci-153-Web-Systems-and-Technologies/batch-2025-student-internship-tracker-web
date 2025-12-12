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
} from "@/components/ui/sidebar";

import { LayoutDashboard, Bell, ListTodo, UserPlus } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserProfile } from "@/lib/org-actions";

export function AppSidebar() {
  const { org_id } = useParams() as { org_id: string };

  const [inviteCode, setInviteCode] = useState("");
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data: org } = await supabase
        .from("organizations")
        .select("invite_code")
        .eq("id", org_id)
        .single();

      if (org?.invite_code) setInviteCode(org.invite_code);

      const { isMentor } = await getUserProfile();
      setIsMentor(isMentor);
    }

    load();
  }, [org_id]);

  function copyToClipboard() {
    navigator.clipboard.writeText(inviteCode);
  }

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

            {/* Dashboard */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${org_id}`}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="ml-2 hidden group-hover:inline">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Tasks */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${org_id}/projects`}>
                  <ListTodo className="h-4 w-4" />
                  <span className="ml-2 hidden group-hover:inline">Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Notifications */}
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
                        <Input value={inviteCode} readOnly className="font-mono" />
                        <Button onClick={copyToClipboard}>Copy</Button>
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
