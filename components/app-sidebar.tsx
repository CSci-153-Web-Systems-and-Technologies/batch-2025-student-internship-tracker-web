import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
 
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="transition-all duration-300 w-16 hover:w-40 bg-slate-900 text-white border-r border-white/10">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
