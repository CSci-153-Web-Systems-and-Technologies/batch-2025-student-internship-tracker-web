import { getUserProfile } from "@/lib/org-actions";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import OrganizationView from "./_components/OrganizationView";
import { MembershipWithOrg } from "@/types/index";

export default async function OrganizationPage() {
    const supabase = await createClient();
    const { user, isMentor } = await getUserProfile();

    const { data: memberships}  = await supabase
      .from("organization_members")
      .select("org_id,organizations(*)")
      .eq("user_id", user?.id) as {data: MembershipWithOrg[] | null};

    if(!memberships){
      throw new Error("Error loading Members");
    }
    const projects = memberships?.map((m) => m.organizations) || [];
    
    return(
       <main>
          <Suspense fallback ={<div>Loading...</div>}>
             <OrganizationView projects={projects} isMentor={isMentor}/>
          </Suspense>
       </main>
    )
}